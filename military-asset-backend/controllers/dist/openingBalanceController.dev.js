"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllOpeningBalances = exports.createOpeningBalance = void 0;

var _OpeningBalance = _interopRequireDefault(require("../models/OpeningBalance.js"));

var _createAuditLog = _interopRequireDefault(require("../utils/createAuditLog.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create Opening Balance
var createOpeningBalance = function createOpeningBalance(req, res) {
  var _req$body, base, equipment, quantity, balanceDate, remarks, openingBalance;

  return regeneratorRuntime.async(function createOpeningBalance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, base = _req$body.base, equipment = _req$body.equipment, quantity = _req$body.quantity, balanceDate = _req$body.balanceDate, remarks = _req$body.remarks;

          if (!(!base || !equipment || quantity === undefined || !balanceDate)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Base, Equipment, Quantity and Balance Date are required."
          }));

        case 4:
          if (!(quantity < 0)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Quantity cannot be negative."
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_OpeningBalance["default"].create({
            base: base,
            equipment: equipment,
            quantity: quantity,
            balanceDate: balanceDate,
            remarks: remarks
          }));

        case 8:
          openingBalance = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap((0, _createAuditLog["default"])({
            user: req.user.id,
            action: "CREATE",
            entity: "OpeningBalance",
            entityId: openingBalance._id,
            details: {
              base: base,
              equipment: equipment,
              quantity: quantity,
              balanceDate: balanceDate
            }
          }));

        case 11:
          res.status(201).json({
            success: true,
            message: "Opening balance created successfully",
            data: openingBalance
          });
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.createOpeningBalance = createOpeningBalance;

var getAllOpeningBalances = function getAllOpeningBalances(req, res) {
  var openingBalances;
  return regeneratorRuntime.async(function getAllOpeningBalances$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_OpeningBalance["default"].find().populate("base").populate("equipment").sort("-balanceDate"));

        case 3:
          openingBalances = _context2.sent;
          res.status(200).json({
            success: true,
            data: openingBalances
          });
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllOpeningBalances = getAllOpeningBalances;
//# sourceMappingURL=openingBalanceController.dev.js.map
