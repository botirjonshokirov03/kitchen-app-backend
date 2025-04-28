const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

// These will be injected dynamically by kitchenMiddleware
let Category;
let Product;
let AdminModel;

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const Admin = require("../models/SuperAdmin/Admin");

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

module.exports = {
  loginAdmin,
  createCategory,
  getCategories,
  createProduct,
  getProducts,
  getCategoryProducts,
};
