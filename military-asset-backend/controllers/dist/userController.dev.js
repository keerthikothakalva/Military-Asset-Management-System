"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = exports.loginUser = exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUser = function createUser(req, res) {
  var _req$body, name, email, password, role, base, emailRegex, existingUser, hashedPassword, user;

  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role, base = _req$body.base; // Input Validation

          if (!(!name || !email || !password || !role)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Name, Email, Password and Role are required."
          }));

        case 4:
          emailRegex = /^\S+@\S+\.\S+$/;

          if (emailRegex.test(email)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid email format."
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 9:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "User already exists."
          }));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 14:
          hashedPassword = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(_User["default"].create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            base: base
          }));

        case 17:
          user = _context.sent;
          res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              base: user.base
            }
          });
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            success: false,
            message: _context.t0.message
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}; // Login..


exports.createUser = createUser;

var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Input Validation

          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Email and Password are required."
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: email
          }));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found."
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, user.password));

        case 11:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "Invalid credentials."
          }));

        case 14:
          token = _jsonwebtoken["default"].sign({
            id: user._id,
            role: user.role,
            base: user.base
          }, process.env.JWT_SECRET, {
            expiresIn: "1d"
          });
          res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              base: user.base
            }
          });
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t0.message
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
}; // Get All Users


exports.loginUser = loginUser;

var getAllUsers = function getAllUsers(req, res) {
  var search, page, limit, sort, users, total;
  return regeneratorRuntime.async(function getAllUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          search = req.query.search || "";
          page = Number(req.query.page) || 1;
          limit = Number(req.query.limit) || 10;
          sort = req.query.sort || "createdAt";
          _context3.next = 7;
          return regeneratorRuntime.awrap(_User["default"].find({
            name: {
              $regex: search,
              $options: "i"
            }
          }).select("-password").populate("base").sort(sort).skip((page - 1) * limit).limit(limit));

        case 7:
          users = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(_User["default"].countDocuments({
            name: {
              $regex: search,
              $options: "i"
            }
          }));

        case 10:
          total = _context3.sent;
          res.status(200).json({
            success: true,
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            data: users
          });
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            success: false,
            message: _context3.t0.message
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.getAllUsers = getAllUsers;
//# sourceMappingURL=userController.dev.js.map
