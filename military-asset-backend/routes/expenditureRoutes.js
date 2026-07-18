import express from "express";
import { createExpenditure, getAllExpenditures, } from "../controllers/expenditureController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Admin", "Base Commander"),
  createExpenditure
);
router.get(
  "/",
  protect,
  getAllExpenditures
);

export default router;