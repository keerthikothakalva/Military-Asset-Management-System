"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllAssignments = exports.createAssignment = void 0;

var _Assignment = _interopRequireDefault(require("../models/Assignment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createAssignment = function createAssignment(req, res) {
  var _req$body, base, equipment, assignedTo, quantity, assignedDate, remarks, assignment;

  return regeneratorRuntime.async(function createAssignment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, base = _req$body.base, equipment = _req$body.equipment, assignedTo = _req$body.assignedTo, quantity = _req$body.quantity, assignedDate = _req$body.assignedDate, remarks = _req$body.remarks; // Input Validation

          if (!(!base || !equipment || !assignedTo || !quantity)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Base, Equipment, Assigned To and Quantity are required."
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
          return regeneratorRuntime.awrap(_Assignment["default"].create({
            base: base,
            equipment: equipment,
            assignedTo: assignedTo,
            quantity: quantity,
            assignedDate: assignedDate,
            remarks: remarks
          }));

        case 8:
          assignment = _context.sent;
          res.status(201).json({
            success: true,
            message: "Equipment assigned successfully",
            data: assignment
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

exports.createAssignment = createAssignment;

var getAllAssignments = function getAllAssignments(req, res) {
  var page, limit, sort, filter, assignments, total;
  return regeneratorRuntime.async(function getAllAssignments$(_context2) {
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
          return regeneratorRuntime.awrap(_Assignment["default"].find(filter).populate("base").populate("equipment").sort(sort).skip((page - 1) * limit).limit(limit));

        case 9:
          assignments = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(_Assignment["default"].countDocuments(filter));

        case 12:
          total = _context2.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: assignments
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

exports.getAllAssignments = getAllAssignments;
//# sourceMappingURL=assignmentController.dev.js.map
