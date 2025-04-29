const express = require("express");
const router = express.Router();
const { protectWorker } = require("../middlewares/authMiddleware");
const { kitchenDbMiddleware } = require("../middlewares/kitchenMiddleware");
const {
  getTables,
  getCategories,
  getCategoryProducts,
} = require("../controllers/admin.controller");
const {
  createOrder,
  getOrders,
  loginWorker,
} = require("../controllers/worker.controller");

router.post("/login", kitchenDbMiddleware, loginWorker);

router.use(protectWorker);
router.use(kitchenDbMiddleware);

// Orders
router.post("/orders", createOrder);
router.get("/orders", getOrders);

// Tables
router.get("/tables", getTables);

// Categories
router.get("/categories", getCategories);
router.get("/categories/:categoryId/products", getCategoryProducts);

module.exports = router;
