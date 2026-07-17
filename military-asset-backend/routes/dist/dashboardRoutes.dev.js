"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dashboardController = require("../controllers/dashboardController.js");

var _authMiddleware = _interopRequireDefault(require("../middleware/authMiddleware.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", _authMiddleware["default"], _dashboardController.getDashboard);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=dashboardRoutes.dev.js.map
