"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auditLogSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: {
    type: String,
    required: true
  },
  entity: {
    type: String,
    required: true
  },
  entityId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: Object
  }
}, {
  timestamps: true
});

var AuditLog = _mongoose["default"].model("AuditLog", auditLogSchema);

var _default = AuditLog;
exports["default"] = _default;
//# sourceMappingURL=AuditLog.dev.js.map
