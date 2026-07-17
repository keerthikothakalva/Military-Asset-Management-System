"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDashboard = void 0;

var _Purchase = _interopRequireDefault(require("../models/Purchase.js"));

var _Transfer = _interopRequireDefault(require("../models/Transfer.js"));

var _Assignment = _interopRequireDefault(require("../models/Assignment.js"));

var _Expenditure = _interopRequireDefault(require("../models/Expenditure.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getDashboard = function getDashboard(req, res) {
  var purchases, transfers, assignments, expenditures, dashboard;
  return regeneratorRuntime.async(function getDashboard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Purchase["default"].find().populate("equipment"));

        case 3:
          purchases = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_Transfer["default"].find().populate("equipment"));

        case 6:
          transfers = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(_Assignment["default"].find().populate("equipment"));

        case 9:
          assignments = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(_Expenditure["default"].find().populate("equipment"));

        case 12:
          expenditures = _context.sent;
          dashboard = {}; // Purchases

          purchases.forEach(function (item) {
            var key = item.equipment.name;

            if (!dashboard[key]) {
              dashboard[key] = {
                purchased: 0,
                transferIn: 0,
                transferOut: 0,
                assigned: 0,
                expended: 0,
                closingBalance: 0
              };
            }

            dashboard[key].purchased += item.quantity;
          }); // Transfers

          transfers.forEach(function (item) {
            var key = item.equipment.name;

            if (!dashboard[key]) {
              dashboard[key] = {
                purchased: 0,
                transferIn: 0,
                transferOut: 0,
                assigned: 0,
                expended: 0,
                closingBalance: 0
              };
            }

            dashboard[key].transferIn += item.quantity;
            dashboard[key].transferOut += item.quantity;
          }); // Assignments

          assignments.forEach(function (item) {
            var key = item.equipment.name;

            if (!dashboard[key]) {
              dashboard[key] = {
                purchased: 0,
                transferIn: 0,
                transferOut: 0,
                assigned: 0,
                expended: 0,
                closingBalance: 0
              };
            }

            dashboard[key].assigned += item.quantity;
          }); // Expenditures

          expenditures.forEach(function (item) {
            var key = item.equipment.name;

            if (!dashboard[key]) {
              dashboard[key] = {
                purchased: 0,
                transferIn: 0,
                transferOut: 0,
                assigned: 0,
                expended: 0,
                closingBalance: 0
              };
            }

            dashboard[key].expended += item.quantity;
          }); // Closing Balance

          Object.keys(dashboard).forEach(function (key) {
            dashboard[key].closingBalance = dashboard[key].purchased + dashboard[key].transferIn - dashboard[key].transferOut - dashboard[key].assigned - dashboard[key].expended;
          });
          res.status(200).json({
            success: true,
            dashboard: dashboard
          });
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

exports.getDashboard = getDashboard;
//# sourceMappingURL=dashboardController.dev.js.map
