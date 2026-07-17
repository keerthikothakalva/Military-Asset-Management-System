import Transfer from "../models/Transfer.js";


export const createTransfer = async (req, res) => {
  try {
    const {
      fromBase,
      toBase,
      equipment,
      quantity,
      transferDate,
      remarks,
    } = req.body;

    // Input Validation
    if (!fromBase || !toBase || !equipment || !quantity) {
      return res.status(400).json({
        success: false,
        message:
          "From Base, To Base, Equipment and Quantity are required.",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0.",
      });
    }

    if (fromBase === toBase) {
      return res.status(400).json({
        success: false,
        message: "Source and destination bases cannot be the same.",
      });
    }

    const transfer = await Transfer.create({
      fromBase,
      toBase,
      equipment,
      quantity,
      transferDate,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Transfer recorded successfully",
      data: transfer,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllTransfers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort || "-createdAt";

    const filter = {};

    if (req.query.fromBase) {
      filter.fromBase = req.query.fromBase;
    }

    if (req.query.toBase) {
      filter.toBase = req.query.toBase;
    }

    if (req.query.equipment) {
      filter.equipment = req.query.equipment;
    }

    const transfers = await Transfer.find(filter)
      .populate("fromBase")
      .populate("toBase")
      .populate("equipment")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Transfer.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: transfers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};