import Assignment from "../models/Assignment.js";
import createAuditLog from "../utils/createAuditLog.js";

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
    
    await createAuditLog({
  user: req.user.id,
  action: "CREATE",
  entity: "Assignment",
  entityId: assignment._id,
  details: {
    base,
    equipment,
    assignedTo,
    quantity,
  },
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

      filter.assignedDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const assignments = await Assignment.find(filter)
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