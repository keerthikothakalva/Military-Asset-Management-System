"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var openingBalanceSchema = new _mongoose["default"].Schema({
  base: {
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
    min: 0
  },
  balanceDate: {
    type: Date,
    required: true
  },
  remarks: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

var OpeningBalance = _mongoose["default"].model("OpeningBalance", openingBalanceSchema);

var _default = OpeningBalance;
exports["default"] = _default;
//# sourceMappingURL=OpeningBalance.dev.js.map
