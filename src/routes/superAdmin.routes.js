import express from "express";
const router = express.Router();
import {
  loginSuperAdmin,
  createKitchen,
  createKitchenAdmin,
  getAllKitchens,
  getAllAdmins,
} from "../controllers/superAdmin.controller.js";
import { protectSuperAdmin } from "../middlewares/authMiddleware.js";

router.post("/login", loginSuperAdmin);

router.post("/kitchens", protectSuperAdmin, createKitchen);
router.get("/kitchens", protectSuperAdmin, getAllKitchens);

router.post("/admins", protectSuperAdmin, createKitchenAdmin);
router.get("/admins", protectSuperAdmin, getAllAdmins);

export default router;
