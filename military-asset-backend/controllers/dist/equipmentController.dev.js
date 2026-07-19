"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllEquipment = exports.createEquipment = void 0;

var _Equipment = _interopRequireDefault(require("../models/Equipment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createEquipment = function createEquipment(req, res) {
  var _req$body, name, type, unit, description, existingEquipment, equipment;

  return regeneratorRuntime.async(function createEquipment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, type = _req$body.type, unit = _req$body.unit, description = _req$body.description;

          if (!(!name || !type || !unit)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Name, Type and Unit are required."
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_Equipment["default"].findOne({
            name: name
          }));

        case 6:
          existingEquipment = _context.sent;

          if (!existingEquipment) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Equipment already exists."
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_Equipment["default"].create({
            name: name,
            type: type,
            unit: unit,
            description: description
          }));

        case 11:
          equipment = _context.sent;
          res.status(201).json({
            success: true,
            message: "Equipment created successfully",
            data: equipment
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
};

exports.createEquipment = createEquipment;

var getAllEquipment = function getAllEquipment(req, res) {
  var search, page, limit, sort, filter, equipment, total;
  return regeneratorRuntime.async(function getAllEquipment$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          search = req.query.search || "";
          page = Number(req.query.page) || 1;
          limit = Number(req.query.limit) || 10;
          sort = req.query.sort || "-createdAt";
          filter = {
            $or: [{
              name: {
                $regex: search,
                $options: "i"
              }
            }, {
              type: {
                $regex: search,
                $options: "i"
              }
            }]
          };
          _context2.next = 8;
          return regeneratorRuntime.awrap(_Equipment["default"].find(filter).sort(sort).skip((page - 1) * limit).limit(limit));

        case 8:
          equipment = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(_Equipment["default"].countDocuments(filter));

        case 11:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: equipment
          });
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.getAllEquipment = getAllEquipment;
//# sourceMappingURL=equipmentController.dev.js.map
