"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuditLog = _interopRequireDefault(require("../models/AuditLog.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createAuditLog = function createAuditLog(_ref) {
  var user, action, entity, entityId, details;
  return regeneratorRuntime.async(function createAuditLog$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = _ref.user, action = _ref.action, entity = _ref.entity, entityId = _ref.entityId, details = _ref.details;
          _context.next = 3;
          return regeneratorRuntime.awrap(_AuditLog["default"].create({
            user: user,
            action: action,
            entity: entity,
            entityId: entityId,
            details: details
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = createAuditLog;
exports["default"] = _default;
//# sourceMappingURL=createAuditLog.dev.js.map
