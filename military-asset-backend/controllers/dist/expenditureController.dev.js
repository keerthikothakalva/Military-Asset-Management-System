"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExpenditure = void 0;

var _Expenditure = _interopRequireDefault(require("../models/Expenditure.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
};

exports.createExpenditure = createExpenditure;
//# sourceMappingURL=expenditureController.dev.js.map
