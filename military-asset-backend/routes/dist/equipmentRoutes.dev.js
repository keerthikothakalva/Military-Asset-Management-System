"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _equipmentController = require("../controllers/equipmentController.js");

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware.js"));

var _roleMiddleware = _interopRequireDefault(require("../middleware/roleMiddleware.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/", _authMiddleware["default"], (0, _roleMiddleware["default"])("Admin", "Logistics Officer"), _equipmentController.createEquipment);
router.get("/", _authMiddleware["default"], _equipmentController.getAllEquipment);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=equipmentRoutes.dev.js.map
