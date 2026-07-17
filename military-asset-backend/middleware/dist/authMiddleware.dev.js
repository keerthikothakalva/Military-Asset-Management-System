"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var protect = function protect(req, res, next) {
  try {
    var token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing"
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

var _default = protect;
exports["default"] = _default;
//# sourceMappingURL=authMiddleware.dev.js.map
