import express from "express";
import { createBase, getAllBases } from "../controllers/baseController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("Admin"), createBase);

router.get("/", protect, getAllBases);

export default router;