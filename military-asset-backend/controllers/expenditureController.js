import Expenditure from "../models/Expenditure.js";
import createAuditLog from "../utils/createAuditLog.js";

// Create Expenditure
export const createExpenditure = async (req, res) => {
  try {
    const {
      base,
      equipment,
      quantity,
      reason,
      expenditureDate,
      remarks,
    } = req.body;

    const expenditure = await Expenditure.create({
      base,
      equipment,
      quantity,
      reason,
      expenditureDate,
      remarks,
    });

    // Create Audit Log
    await createAuditLog({
      user: req.user.id,
      action: "CREATE",
      entity: "Expenditure",
      entityId: expenditure._id,
      details: {
        base,
        equipment,
        quantity,
        reason,
      },
    });

    res.status(201).json({
      success: true,
      message: "Expenditure recorded successfully",
      data: expenditure,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Expenditures
export const getAllExpenditures = async (req, res) => {
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

      filter.expenditureDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const expenditures = await Expenditure.find(filter)
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

    const total = await Expenditure.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: expenditures,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};