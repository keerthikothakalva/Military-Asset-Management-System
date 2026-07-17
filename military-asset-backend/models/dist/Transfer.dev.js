"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var transferSchema = new _mongoose["default"].Schema({
  fromBase: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Base",
    required: true
  },
  toBase: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Base",
    required: true
  },
  equipment: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Equipment",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  transferDate: {
    type: Date,
    "default": Date.now
  },
  remarks: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

var Transfer = _mongoose["default"].model("Transfer", transferSchema);

var _default = Transfer;
exports["default"] = _default;
//# sourceMappingURL=Transfer.dev.js.map
