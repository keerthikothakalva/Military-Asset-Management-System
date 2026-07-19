import Purchase from "../models/Purchase.js";
import createAuditLog from "../utils/createAuditLog.js";

export const createPurchase = async (req, res) => {
  try {
    const { base, equipment, quantity, purchaseDate, remarks } = req.body;

    
    if (!base || !equipment || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Base, Equipment and Quantity are required.",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0.",
      });
    }

    const purchase = await Purchase.create({
      base,
      equipment,
      quantity,
      purchaseDate,
      remarks,
    });
    
    await createAuditLog({
      user: req.user.id,
      action: "CREATE",
      entity: "Purchase",
      entityId: purchase._id,
      details: {
        base,
        equipment,
        quantity,
      },
    });
    
    res.status(201).json({
      success: true,
      message: "Purchase recorded successfully",
      data: purchase,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllPurchases = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort || "-createdAt";

    const filter = {};

    // Filter by Base
    if (req.query.base) {
      filter.base = req.query.base;
    }

    // Filter by Equipment
    if (req.query.equipment) {
      filter.equipment = req.query.equipment;
    }

    // Filter by Date
    if (req.query.date) {
      const startDate = new Date(`${req.query.date}T00:00:00.000Z`);
      const endDate = new Date(`${req.query.date}T23:59:59.999Z`);

      filter.purchaseDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const purchases = await Purchase.find(filter)
      .populate("base")
      .populate({
        path: "equipment",
        match: req.query.equipmentType
          ? { type: req.query.equipmentType }
          : {},
      })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Purchase.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: purchases,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};