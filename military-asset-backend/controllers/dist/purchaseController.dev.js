"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllPurchases = exports.createPurchase = void 0;

var _Purchase = _interopRequireDefault(require("../models/Purchase.js"));

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
          res.status(201).json({
            success: true,
            message: "Purchase recorded successfully",
            data: purchase
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.createPurchase = createPurchase;

var getAllPurchases = function getAllPurchases(req, res) {
  var page, limit, sort, filter, purchases, total;
  return regeneratorRuntime.async(function getAllPurchases$(_context2) {
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
          return regeneratorRuntime.awrap(_Purchase["default"].find(filter).populate("base").populate("equipment").sort(sort).skip((page - 1) * limit).limit(limit));

        case 9:
          purchases = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(_Purchase["default"].countDocuments(filter));

        case 12:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: purchases
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

exports.getAllPurchases = getAllPurchases;
//# sourceMappingURL=purchaseController.dev.js.map
