const express = require("express");
const router = express.Router();
const {
  loginWorker,
  checkIn,
  checkOut,
} = require("../controllers/worker.controller");
const { kitchenDbMiddleware } = require("../middlewares/kitchenMiddleware");

// No login token needed yet (later can protect if needed)

router.post("/checkin", kitchenDbMiddleware, checkIn);
router.post("/checkout", kitchenDbMiddleware, checkOut);

module.exports = router;
