const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  createCategory,
  getCategories,
  createProduct,
  getProducts,
  getCategoryProducts,
} = require("../controllers/admin.controller");
const { protectAdmin } = require("../middlewares/authMiddleware");
const { kitchenDbMiddleware } = require("../middlewares/kitchenMiddleware");

// Admin login
router.post("/login", loginAdmin);

// Protected routes (require login + correct kitchen DB)
router.use(protectAdmin); // Check JWT first
router.use(kitchenDbMiddleware); // Set correct Kitchen DB connection

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:categoryId/products", getCategoryProducts);

router.post("/products", createProduct);
router.get("/products", getProducts);

module.exports = router;
