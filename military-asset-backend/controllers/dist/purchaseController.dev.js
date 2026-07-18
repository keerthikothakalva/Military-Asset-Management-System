"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllPurchases = exports.createPurchase = void 0;

var _Purchase = _interopRequireDefault(require("../models/Purchase.js"));

var _createAuditLog = _interopRequireDefault(require("../utils/createAuditLog.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createPurchase = function createPurchase(req, res) {
  var _req$body, base, equipment, quantity, purchaseDate, remarks, purchase;

  return regeneratorRuntime.async(function createPurchase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, base = _req$body.base, equipment = _req$body.equipment, quantity = _req$body.quantity, purchaseDate = _req$body.purchaseDate, remarks = _req$body.remarks; // Input Validation

          if (!(!base || !equipment || !quantity)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Base, Equipment and Quantity are required."
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
          _context.next = 8;
          return regeneratorRuntime.awrap(_Purchase["default"].create({
            base: base,
            equipment: equipment,
            quantity: quantity,
            purchaseDate: purchaseDate,
            remarks: remarks
          }));

        case 8:
          purchase = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap((0, _createAuditLog["default"])({
            user: req.user.id,
            action: "CREATE",
            entity: "Purchase",
            entityId: purchase._id,
            details: {
              base: base,
              equipment: equipment,
              quantity: quantity
            }
          }));

        case 11:
          res.status(201).json({
            success: true,
            message: "Purchase recorded successfully",
            data: purchase
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

exports.createPurchase = createPurchase;

var getAllPurchases = function getAllPurchases(req, res) {
  var page, limit, sort, filter, startDate, endDate, purchases, total;
  return regeneratorRuntime.async(function getAllPurchases$(_context2) {
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
            filter.purchaseDate = {
              $gte: startDate,
              $lte: endDate
            };
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(_Purchase["default"].find(filter).populate("base").populate({
            path: "equipment",
            match: req.query.equipmentType ? {
              type: req.query.equipmentType
            } : {}
          }).sort(sort).skip((page - 1) * limit).limit(limit));

        case 10:
          purchases = _context2.sent;
          _context2.next = 13;
          return regeneratorRuntime.awrap(_Purchase["default"].countDocuments(filter));

        case 13:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: purchases
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

exports.getAllPurchases = getAllPurchases;
//# sourceMappingURL=purchaseController.dev.js.map
