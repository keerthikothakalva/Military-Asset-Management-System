"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expenditureSchema = new _mongoose["default"].Schema({
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
    min: 1
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  expenditureDate: {
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

var Expenditure = _mongoose["default"].model("Expenditure", expenditureSchema);

var _default = Expenditure;
exports["default"] = _default;
//# sourceMappingURL=Expenditure.dev.js.map
