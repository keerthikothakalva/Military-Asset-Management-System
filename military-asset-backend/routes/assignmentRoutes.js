import express from "express";
import {
  createAssignment,
  getAllAssignments,
} from "../controllers/assignmentController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Admin", "Base Commander"),
  createAssignment
);

router.get(
  "/",
  protect,
  getAllAssignments
);

export default router;