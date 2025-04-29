import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import Admin from "../models/SuperAdmin/Admin.js";

// These will be injected dynamically by kitchenMiddleware
let Category;
let Product;
let AdminModel;
let Worker;
let Table;

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    role: "admin",
    kitchenId: admin.kitchenId,
    adminId: admin._id,
  });

  res.json({ token });
};

const createCategory = async (req, res) => {
  Category = req.kitchenDb.model("Category");
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const category = await Category.create({ name });
  res.status(201).json(category);
};

const getCategories = async (req, res) => {
  Category = req.kitchenDb.model("Category");
  const categories = await Category.find();
  res.json(categories);
};

const createProduct = async (req, res) => {
  Product = req.kitchenDb.model("Product");
  const { name, price, description, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const product = await Product.create({
    name,
    price,
    description,
    categoryId,
  });

  res.status(201).json(product);
};

const getProducts = async (req, res) => {
  Product = req.kitchenDb.model("Product");
  const products = await Product.find();
  res.json(products);
};

const getCategoryProducts = async (req, res) => {
  const { categoryId } = req.params;
  Product = req.kitchenDb.model("Product");

  const products = await Product.find({ categoryId });

  if (!products || products.length === 0) {
    return res
      .status(404)
      .json({ message: "No products found for this category" });
  }

  res.json(products);
};

const createWorker = async (req, res) => {
  try {
    Worker = req.kitchenDb.model("Worker");

    const { name, role, username, password } = req.body;

    if (!name || !role || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Worker.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newWorker = new Worker({
      name,
      role,
      username,
      password: hashedPassword,
    });

    const savedWorker = await newWorker.save(); // ✅ explicitly save it

    res.status(201).json(savedWorker);
  } catch (err) {
    console.error("Worker creation error:", err.message);
    res.status(500).json({ message: "Failed to create worker" });
  }
};

const getWorkers = async (req, res) => {
  Worker = req.kitchenDb.model("Worker");
  const workers = await Worker.find();
  res.json(workers);
};

const createTable = async (req, res) => {
  Table = req.kitchenDb.model("Table");
  const { number, capacity } = req.body;

  if (!number || !capacity) {
    return res
      .status(400)
      .json({ message: "Number and capacity are required" });
  }

  const table = await Table.create({ number, capacity });
  res.status(201).json(table);
};

const getTables = async (req, res) => {
  Table = req.kitchenDb.model("Table");
  const tables = await Table.find();
  res.json(tables);
};

const calculateWorkingHours = async (req, res) => {
  Worker = req.kitchenDb.model("Worker");
  const { username } = req.params;

  const worker = await Worker.findOne({ username });
  if (!worker) {
    return res.status(404).json({ message: "Worker not found" });
  }

  let totalMinutes = 0;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  for (const check of worker.checkIns) {
    if (check.checkInTime && check.checkOutTime) {
      const checkInDate = new Date(check.checkInTime);
      const checkOutDate = new Date(check.checkOutTime);

      if (
        checkInDate.getMonth() === currentMonth &&
        checkInDate.getFullYear() === currentYear
      ) {
        const diffMs = checkOutDate - checkInDate;
        totalMinutes += Math.floor(diffMs / (1000 * 60));
      }
    }
  }

  const totalHours = (totalMinutes / 60).toFixed(2);

  res.json({
    username: worker.username,
    name: worker.name,
    month: currentMonth + 1, // because JS months are 0-11
    totalHours,
    totalMinutes,
    workSessions: worker.checkIns.length,
  });
};

export {
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
};
