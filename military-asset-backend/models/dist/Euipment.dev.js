"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var equipmentSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    "enum": ["Weapon", "Vehicle", "Ammunition", "Communication", "Medical", "Others"]
  },
  unit: {
    type: String,
    required: true,
    "default": "Pieces"
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

var Equipment = _mongoose["default"].model("Equipment", equipmentSchema);

var _default = Equipment;
exports["default"] = _default;
//# sourceMappingURL=Euipment.dev.js.map
