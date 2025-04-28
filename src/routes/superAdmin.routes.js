const express = require("express");
const router = express.Router();
const {
  loginSuperAdmin,
  createKitchen,
  createKitchenAdmin,
  getAllKitchens,
  getAllAdmins,
} = require("../controllers/superAdmin.controller");
const { protectSuperAdmin } = require("../middlewares/authMiddleware");

// SuperAdmin login (no auth required)
router.post("/login", loginSuperAdmin);

// Protected routes (only SuperAdmin can access)
router.post("/kitchens", protectSuperAdmin, createKitchen);
router.get("/kitchens", protectSuperAdmin, getAllKitchens);

router.post("/admins", protectSuperAdmin, createKitchenAdmin);
router.get("/admins", protectSuperAdmin, getAllAdmins);

module.exports = router;
