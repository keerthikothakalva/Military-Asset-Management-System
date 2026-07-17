import express from "express";
import { createEquipment , getAllEquipment, } from "../controllers/equipmentController.js";
import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";


const router = express.Router();

router.post(
    "/", 
    protect,
  authorize("Admin", "Logistics Officer"),
  createEquipment
);
router.get(
  "/",
  protect,
  getAllEquipment
);

export default router;