import express from "express";
import {
  createPurchase,
  getAllPurchases,
} from "../controllers/purchaseController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Admin", "Logistics Officer"),
  createPurchase
);

router.get(
  "/",
  protect,
  getAllPurchases
);

export default router;