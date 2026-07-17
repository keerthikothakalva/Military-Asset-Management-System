"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTransfers = exports.createTransfer = void 0;

var _Transfer = _interopRequireDefault(require("../models/Transfer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createTransfer = function createTransfer(req, res) {
  var _req$body, fromBase, toBase, equipment, quantity, transferDate, remarks, transfer;

  return regeneratorRuntime.async(function createTransfer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, fromBase = _req$body.fromBase, toBase = _req$body.toBase, equipment = _req$body.equipment, quantity = _req$body.quantity, transferDate = _req$body.transferDate, remarks = _req$body.remarks; // Input Validation

          if (!(!fromBase || !toBase || !equipment || !quantity)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "From Base, To Base, Equipment and Quantity are required."
          }));

        case 4:
          if (!(quantity <= 0)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Quantity must be greater than 0."
          }));

        case 6:
          if (!(fromBase === toBase)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Source and destination bases cannot be the same."
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_Transfer["default"].create({
            fromBase: fromBase,
            toBase: toBase,
            equipment: equipment,
            quantity: quantity,
            transferDate: transferDate,
            remarks: remarks
          }));

        case 10:
          transfer = _context.sent;
          res.status(201).json({
            success: true,
            message: "Transfer recorded successfully",
            data: transfer
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

exports.createTransfer = createTransfer;

var getAllTransfers = function getAllTransfers(req, res) {
  var page, limit, sort, filter, transfers, total;
  return regeneratorRuntime.async(function getAllTransfers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = Number(req.query.page) || 1;
          limit = Number(req.query.limit) || 10;
          sort = req.query.sort || "-createdAt";
          filter = {};

          if (req.query.fromBase) {
            filter.fromBase = req.query.fromBase;
          }

          if (req.query.toBase) {
            filter.toBase = req.query.toBase;
          }

          if (req.query.equipment) {
            filter.equipment = req.query.equipment;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(_Transfer["default"].find(filter).populate("fromBase").populate("toBase").populate("equipment").sort(sort).skip((page - 1) * limit).limit(limit));

        case 10:
          transfers = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(_Transfer["default"].countDocuments(filter));

        case 13:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: transfers
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

exports.getAllTransfers = getAllTransfers;
//# sourceMappingURL=transferController.dev.js.map
