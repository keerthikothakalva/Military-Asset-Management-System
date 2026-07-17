import Purchase from "../models/Purchase.js";


export const createPurchase = async (req, res) => {
  try {
    const { base, equipment, quantity, purchaseDate, remarks } = req.body;

    // Input Validation
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

    if (req.query.base) {
      filter.base = req.query.base;
    }

    if (req.query.equipment) {
      filter.equipment = req.query.equipment;
    }

    const purchases = await Purchase.find(filter)
      .populate("base")
      .populate("equipment")
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