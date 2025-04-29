import express from "express";
const router = express.Router();
import { protectWorker } from "../middlewares/authMiddleware.js";
import { kitchenDbMiddleware } from "../middlewares/kitchenMiddleware.js";
import {
  getTables,
  getCategories,
  getCategoryProducts,
} from "../controllers/admin.controller.js";
import {
  createOrder,
  getOrders,
  loginWorker,
} from "../controllers/worker.controller.js";

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

export default router;
