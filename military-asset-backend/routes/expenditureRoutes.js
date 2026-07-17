import express from "express";
import { createExpenditure } from "../controllers/expenditureController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Admin", "Base Commander"),
  createExpenditure
);

export default router;