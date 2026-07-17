import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();


router.post("/", createUser);
router.post("/login", loginUser);


router.get("/", protect, authorize("Admin"), getAllUsers);

export default router;