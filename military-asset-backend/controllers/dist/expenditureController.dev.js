"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllExpenditures = exports.createExpenditure = void 0;

var _Expenditure = _interopRequireDefault(require("../models/Expenditure.js"));

var _createAuditLog = _interopRequireDefault(require("../utils/createAuditLog.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create Expenditure
var createExpenditure = function createExpenditure(req, res) {
  var _req$body, base, equipment, quantity, reason, expenditureDate, remarks, expenditure;

  return regeneratorRuntime.async(function createExpenditure$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, base = _req$body.base, equipment = _req$body.equipment, quantity = _req$body.quantity, reason = _req$body.reason, expenditureDate = _req$body.expenditureDate, remarks = _req$body.remarks;
          _context.next = 4;
          return regeneratorRuntime.awrap(_Expenditure["default"].create({
            base: base,
            equipment: equipment,
            quantity: quantity,
            reason: reason,
            expenditureDate: expenditureDate,
            remarks: remarks
          }));

        case 4:
          expenditure = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _createAuditLog["default"])({
            user: req.user.id,
            action: "CREATE",
            entity: "Expenditure",
            entityId: expenditure._id,
            details: {
              base: base,
              equipment: equipment,
              quantity: quantity,
              reason: reason
            }
          }));

        case 7:
          res.status(201).json({
            success: true,
            message: "Expenditure recorded successfully",
            data: expenditure
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Get All Expenditures


exports.createExpenditure = createExpenditure;

var getAllExpenditures = function getAllExpenditures(req, res) {
  var page, limit, sort, filter, startDate, endDate, expenditures, total;
  return regeneratorRuntime.async(function getAllExpenditures$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = Number(req.query.page) || 1;
          limit = Number(req.query.limit) || 10;
          sort = req.query.sort || "-createdAt";
          filter = {}; // Filter by Base

          if (req.query.base) {
            filter.base = req.query.base;
          } // Filter by Equipment


          if (req.query.equipment) {
            filter.equipment = req.query.equipment;
          } // Filter by Date


          if (req.query.date) {
            startDate = new Date("".concat(req.query.date, "T00:00:00.000Z"));
            endDate = new Date("".concat(req.query.date, "T23:59:59.999Z"));
            filter.expenditureDate = {
              $gte: startDate,
              $lte: endDate
            };
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(_Expenditure["default"].find(filter).populate("base").populate({
            path: "equipment",
            match: req.query.equipmentType ? {
              type: req.query.equipmentType
            } : {}
          }).sort(sort).skip((page - 1) * limit).limit(limit));

        case 10:
          expenditures = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(_Expenditure["default"].countDocuments(filter));

        case 13:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: expenditures
          });
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.getAllExpenditures = getAllExpenditures;
//# sourceMappingURL=expenditureController.dev.js.map
