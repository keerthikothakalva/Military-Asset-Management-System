import Equipment from "../models/Equipment.js";


export const createEquipment = async (req, res) => {
  try {
    const { name, type, unit, description } = req.body;

    // Input Validation
    if (!name || !type || !unit) {
      return res.status(400).json({
        success: false,
        message: "Name, Type and Unit are required.",
      });
    }

    
    const existingEquipment = await Equipment.findOne({ name });

    if (existingEquipment) {
      return res.status(400).json({
        success: false,
        message: "Equipment already exists.",
      });
    }

    const equipment = await Equipment.create({
      name,
      type,
      unit,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Equipment created successfully",
      data: equipment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEquipment = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort || "-createdAt";

    const filter = {
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          type: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const equipment = await Equipment.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Equipment.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: equipment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};