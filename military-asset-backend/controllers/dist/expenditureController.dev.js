"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllExpenditures = exports.createExpenditure = void 0;

var _Expenditure = _interopRequireDefault(require("../models/Expenditure.js"));

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
          res.status(201).json({
            success: true,
            message: "Expenditure recorded successfully",
            data: expenditure
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get All Expenditures


exports.createExpenditure = createExpenditure;

var getAllExpenditures = function getAllExpenditures(req, res) {
  var page, limit, sort, filter, expenditures, total;
  return regeneratorRuntime.async(function getAllExpenditures$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = Number(req.query.page) || 1;
          limit = Number(req.query.limit) || 10;
          sort = req.query.sort || "-createdAt";
          filter = {};

          if (req.query.base) {
            filter.base = req.query.base;
          }

          if (req.query.equipment) {
            filter.equipment = req.query.equipment;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(_Expenditure["default"].find(filter).populate("base").populate("equipment").sort(sort).skip((page - 1) * limit).limit(limit));

        case 9:
          expenditures = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(_Expenditure["default"].countDocuments(filter));

        case 12:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: expenditures
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.getAllExpenditures = getAllExpenditures;
//# sourceMappingURL=expenditureController.dev.js.map
