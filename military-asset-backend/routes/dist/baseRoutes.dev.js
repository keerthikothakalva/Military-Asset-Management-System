"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _baseController = require("../controllers/baseController.js");

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware.js"));

var _roleMiddleware = _interopRequireDefault(require("../middleware/roleMiddleware.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/", _authMiddleware["default"], (0, _roleMiddleware["default"])("Admin"), _baseController.createBase);
router.get("/", _authMiddleware["default"], _baseController.getAllBases);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=baseRoutes.dev.js.map
