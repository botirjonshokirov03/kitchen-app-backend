const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  createCategory,
  getCategories,
  createProduct,
  getProducts,
  getCategoryProducts,
  createWorker,
  getWorkers,
  createTable,
  getTables,
  calculateWorkingHours,
} = require("../controllers/admin.controller");

const { protectAdmin } = require("../middlewares/authMiddleware");
const { kitchenDbMiddleware } = require("../middlewares/kitchenMiddleware");

// Admin login
router.post("/login", loginAdmin);

router.use(protectAdmin);
router.use(kitchenDbMiddleware);

router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:categoryId/products", getCategoryProducts);

router.post("/products", createProduct);
router.get("/products", getProducts);

// Workers
router.post("/workers", createWorker);
router.get("/workers", getWorkers);

// Tables
router.post("/tables", createTable);
router.get("/tables", getTables);

router.get("/workers/:username/working-hours", calculateWorkingHours);

module.exports = router;
