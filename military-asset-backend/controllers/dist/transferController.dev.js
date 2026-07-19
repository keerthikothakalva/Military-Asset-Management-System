"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTransfers = exports.createTransfer = void 0;

var _Transfer = _interopRequireDefault(require("../models/Transfer.js"));

var _createAuditLog = _interopRequireDefault(require("../utils/createAuditLog.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createTransfer = function createTransfer(req, res) {
  var _req$body, fromBase, toBase, equipment, quantity, transferDate, remarks, transfer;

  return regeneratorRuntime.async(function createTransfer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, fromBase = _req$body.fromBase, toBase = _req$body.toBase, equipment = _req$body.equipment, quantity = _req$body.quantity, transferDate = _req$body.transferDate, remarks = _req$body.remarks;

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
          _context.next = 13;
          return regeneratorRuntime.awrap((0, _createAuditLog["default"])({
            user: req.user.id,
            action: "CREATE",
            entity: "Transfer",
            entityId: transfer._id,
            details: {
              fromBase: fromBase,
              toBase: toBase,
              equipment: equipment,
              quantity: quantity
            }
          }));

        case 13:
          res.status(201).json({
            success: true,
            message: "Transfer recorded successfully",
            data: transfer
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.createTransfer = createTransfer;

var getAllTransfers = function getAllTransfers(req, res) {
  var page, limit, sort, filter, startDate, endDate, transfers, total;
  return regeneratorRuntime.async(function getAllTransfers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = Number(req.query.page) || 1;
          limit = Number(req.query.limit) || 10;
          sort = req.query.sort || "-createdAt";
          filter = {}; // Filter by From Base

          if (req.query.fromBase) {
            filter.fromBase = req.query.fromBase;
          } // Filter by To Base


          if (req.query.toBase) {
            filter.toBase = req.query.toBase;
          } // Filter by Equipment


          if (req.query.equipment) {
            filter.equipment = req.query.equipment;
          } // Filter by Date


          if (req.query.date) {
            startDate = new Date("".concat(req.query.date, "T00:00:00.000Z"));
            endDate = new Date("".concat(req.query.date, "T23:59:59.999Z"));
            filter.transferDate = {
              $gte: startDate,
              $lte: endDate
            };
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(_Transfer["default"].find(filter).populate("fromBase").populate("toBase").populate({
            path: "equipment",
            match: req.query.equipmentType ? {
              type: req.query.equipmentType
            } : {}
          }).sort(sort).skip((page - 1) * limit).limit(limit));

        case 11:
          transfers = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(_Transfer["default"].countDocuments(filter));

        case 14:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: transfers
          });
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

exports.getAllTransfers = getAllTransfers;
//# sourceMappingURL=transferController.dev.js.map
