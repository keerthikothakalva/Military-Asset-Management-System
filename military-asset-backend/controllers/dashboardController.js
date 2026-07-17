import Purchase from "../models/Purchase.js";
import Transfer from "../models/Transfer.js";
import Assignment from "../models/Assignment.js";
import Expenditure from "../models/Expenditure.js";

export const getDashboard = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate("equipment");
    const transfers = await Transfer.find().populate("equipment");
    const assignments = await Assignment.find().populate("equipment");
    const expenditures = await Expenditure.find().populate("equipment");

    const dashboard = {};

    // Purchases
    purchases.forEach((item) => {
      const key = item.equipment.name;

      if (!dashboard[key]) {
        dashboard[key] = {
          purchased: 0,
          transferIn: 0,
          transferOut: 0,
          assigned: 0,
          expended: 0,
          closingBalance: 0,
        };
      }

      dashboard[key].purchased += item.quantity;
    });

    // Transfers
    transfers.forEach((item) => {
      const key = item.equipment.name;

      if (!dashboard[key]) {
        dashboard[key] = {
          purchased: 0,
          transferIn: 0,
          transferOut: 0,
          assigned: 0,
          expended: 0,
          closingBalance: 0,
        };
      }

      dashboard[key].transferIn += item.quantity;
      dashboard[key].transferOut += item.quantity;
    });

    // Assignments
    assignments.forEach((item) => {
      const key = item.equipment.name;

      if (!dashboard[key]) {
        dashboard[key] = {
          purchased: 0,
          transferIn: 0,
          transferOut: 0,
          assigned: 0,
          expended: 0,
          closingBalance: 0,
        };
      }

      dashboard[key].assigned += item.quantity;
    });

    // Expenditures
    expenditures.forEach((item) => {
      const key = item.equipment.name;

      if (!dashboard[key]) {
        dashboard[key] = {
          purchased: 0,
          transferIn: 0,
          transferOut: 0,
          assigned: 0,
          expended: 0,
          closingBalance: 0,
        };
      }

      dashboard[key].expended += item.quantity;
    });

    // Closing Balance
    Object.keys(dashboard).forEach((key) => {
      dashboard[key].closingBalance =
        dashboard[key].purchased +
        dashboard[key].transferIn -
        dashboard[key].transferOut -
        dashboard[key].assigned -
        dashboard[key].expended;
    });

    res.status(200).json({
      success: true,
      dashboard,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};