import express from "express";
const router = express.Router();
import { checkIn, checkOut } from "../controllers/worker.controller.js";
import { kitchenDbMiddleware } from "../middlewares/kitchenMiddleware.js";

// No login token needed yet (later can protect if needed)

router.post("/checkin", kitchenDbMiddleware, checkIn);
router.post("/checkout", kitchenDbMiddleware, checkOut);

export default router;
