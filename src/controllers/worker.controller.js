const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let Order;
let Table;
let Worker;

const createOrder = async (req, res) => {
  Order = req.kitchenDb.model("Order");
  Table = req.kitchenDb.model("Table");
  Worker = req.kitchenDb.model("Worker");

  const {
    tableNumber,
    waiterId,
    items,
    kitchenName,
    discount = 0,
    serviceFee = 0,
  } = req.body;

  // Find waiter
  const waiter = await Worker.findById(waiterId);
  if (!waiter || waiter.role !== "waiter") {
    return res.status(400).json({ message: "Invalid waiter selected" });
  }

  // Find table
  const table = await Table.findOne({ number: tableNumber });
  if (!table || table.status === "occupied") {
    return res.status(400).json({ message: "Table not available" });
  }

  // Calculate total
  let totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let finalPrice = totalPrice + serviceFee - discount;

  const order = await Order.create({
    tableNumber,
    waiterName: waiter.name,
    items,
    kitchenName,
    serviceFee,
    discount,
    totalPrice,
    finalPrice,
  });

  // Mark table as occupied
  table.status = "occupied";
  await table.save();

  res.status(201).json(order);
};

const getOrders = async (req, res) => {
  Order = req.kitchenDb.model("Order");
  const orders = await Order.find();
  res.json(orders);
};

const loginWorker = async (req, res) => {
  Worker = req.kitchenDb.model("Worker");
  const { username, password } = req.body;

  const worker = await Worker.findOne({ username });
  if (!worker) {
    return res.status(400).json({ message: "Worker not found" });
  }

  const isMatch = await bcrypt.compare(password, worker.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Get kitchenId manually from kitchenDb name
  const dbName = worker.collection.conn.name; // kitchen_xxxxxxxx
  const kitchenId = dbName.replace("kitchen_", ""); // remove kitchen_ prefix

  // generate token with kitchenId
  const token = jwt.sign(
    {
      id: worker._id,
      role: worker.role,
      username: worker.username,
      kitchenId: kitchenId, // add this
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};

const checkIn = async (req, res) => {
  Worker = req.kitchenDb.model("Worker");
  const { username } = req.body;

  const worker = await Worker.findOne({ username });
  if (!worker) {
    return res.status(400).json({ message: "Worker not found" });
  }

  worker.checkIns.push({ checkInTime: new Date() });
  await worker.save();

  res.json({ message: "Check-In successful", worker });
};

const checkOut = async (req, res) => {
  Worker = req.kitchenDb.model("Worker");
  const { username } = req.body;

  const worker = await Worker.findOne({ username });
  if (!worker) {
    return res.status(400).json({ message: "Worker not found" });
  }

  const lastCheckIn = worker.checkIns.find((ci) => !ci.checkOutTime);
  if (!lastCheckIn) {
    return res.status(400).json({ message: "No active check-in found" });
  }

  lastCheckIn.checkOutTime = new Date();
  await worker.save();

  res.json({ message: "Check-Out successful", worker });
};

module.exports = { loginWorker, checkIn, checkOut, createOrder, getOrders };
