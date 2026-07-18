import OpeningBalance from "../models/OpeningBalance.js";
import createAuditLog from "../utils/createAuditLog.js";

// Create Opening Balance
export const createOpeningBalance = async (req, res) => {
  try {
    const {
      base,
      equipment,
      quantity,
      balanceDate,
      remarks,
    } = req.body;

    if (!base || !equipment || quantity === undefined || !balanceDate) {
      return res.status(400).json({
        success: false,
        message:
          "Base, Equipment, Quantity and Balance Date are required.",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative.",
      });
    }

    const openingBalance = await OpeningBalance.create({
      base,
      equipment,
      quantity,
      balanceDate,
      remarks,
    });

    await createAuditLog({
      user: req.user.id,
      action: "CREATE",
      entity: "OpeningBalance",
      entityId: openingBalance._id,
      details: {
        base,
        equipment,
        quantity,
        balanceDate,
      },
    });

    res.status(201).json({
      success: true,
      message: "Opening balance created successfully",
      data: openingBalance,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllOpeningBalances = async (req, res) => {
  try {
    const openingBalances = await OpeningBalance.find()
      .populate("base")
      .populate("equipment")
      .sort("-balanceDate");

    res.status(200).json({
      success: true,
      data: openingBalances,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};