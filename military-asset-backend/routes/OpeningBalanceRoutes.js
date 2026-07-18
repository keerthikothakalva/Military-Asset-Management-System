import express from "express";
import {
  createOpeningBalance,
  getAllOpeningBalances,
} from "../controllers/OpeningBalanceController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Admin", "Base Commander"),
  createOpeningBalance
);
router.get(
  "/",
  protect,
  getAllOpeningBalances
);
export default router;