import Expenditure from "../models/Expenditure.js";

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