import express from "express";
import {
  createTransfer,
  getAllTransfers,
} from "../controllers/transferController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Admin", "Logistics Officer"),
  createTransfer
);

router.get(
  "/",
  protect,
  getAllTransfers
);

export default router;