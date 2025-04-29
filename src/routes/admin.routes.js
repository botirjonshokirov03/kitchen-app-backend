import express from "express";
const router = express.Router();
import {
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
} from "../controllers/admin.controller.js";

import { protectAdmin } from "../middlewares/authMiddleware.js";
import { kitchenDbMiddleware } from "../middlewares/kitchenMiddleware.js";

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

export default router;
