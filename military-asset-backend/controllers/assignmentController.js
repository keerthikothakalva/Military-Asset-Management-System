import Assignment from "../models/Assignment.js";


export const createAssignment = async (req, res) => {
  try {
    const {
      base,
      equipment,
      assignedTo,
      quantity,
      assignedDate,
      remarks,
    } = req.body;

    // Input Validation
    if (!base || !equipment || !assignedTo || !quantity) {
      return res.status(400).json({
        success: false,
        message:
          "Base, Equipment, Assigned To and Quantity are required.",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0.",
      });
    }

    const assignment = await Assignment.create({
      base,
      equipment,
      assignedTo,
      quantity,
      assignedDate,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Equipment assigned successfully",
      data: assignment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllAssignments = async (req, res) => {
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

    const assignments = await Assignment.find(filter)
      .populate("base")
      .populate("equipment")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Assignment.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: assignments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};