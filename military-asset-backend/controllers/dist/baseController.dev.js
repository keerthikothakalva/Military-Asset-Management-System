"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllBases = exports.createBase = void 0;

var _Base = _interopRequireDefault(require("../models/Base.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create Base
var createBase = function createBase(req, res) {
  var _req$body, name, code, location, existingBase, base;

  return regeneratorRuntime.async(function createBase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, code = _req$body.code, location = _req$body.location;

          if (!(!name || !code || !location)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Name, Code and Location are required."
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_Base["default"].findOne({
            code: code
          }));

        case 6:
          existingBase = _context.sent;

          if (!existingBase) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Base with this code already exists."
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_Base["default"].create({
            name: name,
            code: code,
            location: location
          }));

        case 11:
          base = _context.sent;
          res.status(201).json({
            success: true,
            message: "Base created successfully",
            data: base
          });
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; // Get All Bases


exports.createBase = createBase;

var getAllBases = function getAllBases(req, res) {
  var search, page, limit, sort, bases, total;
  return regeneratorRuntime.async(function getAllBases$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          search = req.query.search || "";
          page = Number(req.query.page) || 1;
          limit = Number(req.query.limit) || 10;
          sort = req.query.sort || "createdAt";
          _context2.next = 7;
          return regeneratorRuntime.awrap(_Base["default"].find({
            name: {
              $regex: search,
              $options: "i"
            }
          }).sort(sort).skip((page - 1) * limit).limit(limit));

        case 7:
          bases = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(_Base["default"].countDocuments({
            name: {
              $regex: search,
              $options: "i"
            }
          }));

        case 10:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: bases
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.getAllBases = getAllBases;
//# sourceMappingURL=baseController.dev.js.map
