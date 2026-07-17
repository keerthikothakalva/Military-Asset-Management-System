"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController.js");

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware.js"));

var _roleMiddleware = _interopRequireDefault(require("../middleware/roleMiddleware.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/", _userController.createUser);
router.post("/login", _userController.loginUser);
router.get("/", _authMiddleware["default"], (0, _roleMiddleware["default"])("Admin"), _userController.getAllUsers);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=userRoutes.dev.js.map
