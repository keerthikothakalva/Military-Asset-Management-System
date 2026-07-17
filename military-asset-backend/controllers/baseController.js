import Base from "../models/Base.js";

// Create Base
export const createBase = async (req, res) => {
  try {
    const { name, code, location } = req.body;

    
    if (!name || !code || !location) {
      return res.status(400).json({
        success: false,
        message: "Name, Code and Location are required.",
      });
    }

    
    const existingBase = await Base.findOne({ code });

    if (existingBase) {
      return res.status(400).json({
        success: false,
        message: "Base with this code already exists.",
      });
    }

    const base = await Base.create({
      name,
      code,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Base created successfully",
      data: base,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Bases
export const getAllBases = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort || "createdAt";

    const bases = await Base.find({
      name: {
        $regex: search,
        $options: "i",
      },
    })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Base.countDocuments({
      name: {
        $regex: search,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: bases,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};