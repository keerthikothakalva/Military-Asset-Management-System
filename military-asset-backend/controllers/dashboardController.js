import Purchase from "../models/Purchase.js";
import Transfer from "../models/Transfer.js";
import Assignment from "../models/Assignment.js";
import Expenditure from "../models/Expenditure.js";
import OpeningBalance from "../models/OpeningBalance.js";
export const getDashboard = async (req, res) => {
  try {
    const { date, base, equipmentType } = req.query;

    // Base Commander can only access their assigned base
    let selectedBase = base;

    if (req.user.role === "Base Commander") {
      selectedBase = req.user.base;
    }

    const equipmentFilter = {};

    if (equipmentType) {
      equipmentFilter.type = equipmentType;
    }

    // Purchases
    const purchaseFilter = {};

    if (selectedBase) {
      purchaseFilter.base = selectedBase;
    }

    if (date) {
      purchaseFilter.purchaseDate = {
        $lte: new Date(`${date}T23:59:59.999Z`),
      };
    }

    const purchases = await Purchase.find(purchaseFilter)
      .populate({
        path: "equipment",
        match: equipmentFilter,
      });

    // Transfers
    
const transferFilter = {};

if (selectedBase) {
  transferFilter.$or = [
    { fromBase: selectedBase },
    { toBase: selectedBase },
  ];
}

if (date) {
  transferFilter.transferDate = {
    $lte: new Date(`${date}T23:59:59.999Z`),
  };
}

const transfers = await Transfer.find(transferFilter)
  .populate({
    path: "equipment",
    match: equipmentFilter,
  });

    // Assignments
    const assignmentFilter = {};

    if (selectedBase) {
      assignmentFilter.base = selectedBase;
    }

    if (date) {
      assignmentFilter.assignedDate = {
        $lte: new Date(`${date}T23:59:59.999Z`),
      };
    }

    const assignments = await Assignment.find(assignmentFilter)
      .populate({
        path: "equipment",
        match: equipmentFilter,
      });

    // Expenditures
    const expenditureFilter = {};

    if (selectedBase) {
      expenditureFilter.base = selectedBase;
    }

    if (date) {
      expenditureFilter.expenditureDate = {
        $lte: new Date(`${date}T23:59:59.999Z`),
      };
    }

    const expenditures = await Expenditure.find(expenditureFilter)
      .populate({
        path: "equipment",
        match: equipmentFilter,
      });

    const dashboard = {};

    const createEquipment = (equipment) => {
      if (!equipment) return null;

      const key = equipment._id.toString();

      if (!dashboard[key]) {
        dashboard[key] = {
          equipmentId: equipment._id,
          equipmentName: equipment.name,
          equipmentType: equipment.type,
          purchased: 0,
          transferIn: 0,
          transferOut: 0,
          assigned: 0,
          expended: 0,
          openingBalance: 0,
          netMovement: 0,
          closingBalance: 0,
        };
      }

      return key;
    };

    // Purchases
    purchases.forEach((item) => {
      const key = createEquipment(item.equipment);

      if (key) {
        dashboard[key].purchased += item.quantity;
      }
    });

    // Transfers
transfers.forEach((item) => {
  const key = createEquipment(item.equipment);

  if (!key) return;

  // Transfer In
  if (
    !selectedBase ||
    item.toBase?.toString() === selectedBase.toString()
  ) {
    dashboard[key].transferIn += item.quantity;
  }

  // Transfer Out
  if (
    !selectedBase ||
    item.fromBase?.toString() === selectedBase.toString()
  ) {
    dashboard[key].transferOut += item.quantity;
  }
});

    // Assignments
    assignments.forEach((item) => {
      const key = createEquipment(item.equipment);

      if (key) {
        dashboard[key].assigned += item.quantity;
      }
    });

    // Expenditures
    expenditures.forEach((item) => {
      const key = createEquipment(item.equipment);

      if (key) {
        dashboard[key].expended += item.quantity;
      }
    });

    // Calculate balances
    Object.values(dashboard).forEach((item) => {
      item.openingBalance = 0;

      item.netMovement =
        item.purchased +
        item.transferIn -
        item.transferOut;

      item.closingBalance =
        item.openingBalance +
        item.netMovement -
        item.assigned -
        item.expended;
    });

    // Total metrics
    const totals = Object.values(dashboard).reduce(
      (total, item) => {
        total.openingBalance += item.openingBalance;
        total.closingBalance += item.closingBalance;
        total.netMovement += item.netMovement;
        total.assigned += item.assigned;
        total.expended += item.expended;

        return total;
      },
      {
        openingBalance: 0,
        closingBalance: 0,
        netMovement: 0,
        assigned: 0,
        expended: 0,
      }
    );

    res.status(200).json({
      success: true,
      totals,
      data: Object.values(dashboard),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};