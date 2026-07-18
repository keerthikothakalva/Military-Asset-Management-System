import Expenditure from "../models/Expenditure.js";

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

    if (req.query.base) {
      filter.base = req.query.base;
    }

    if (req.query.equipment) {
      filter.equipment = req.query.equipment;
    }

    const expenditures = await Expenditure.find(filter)
      .populate("base")
      .populate("equipment")
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