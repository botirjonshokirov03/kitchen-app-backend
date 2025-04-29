import bcrypt from "bcryptjs";
import Kitchen from "../models/SuperAdmin/Kitchen.js";
import Admin from "../models/SuperAdmin/Admin.js";
import { generateToken } from "../utils/generateToken.js";

// Hardcoded SuperAdmin (for simplicity)
const SUPERADMIN_EMAIL = "superadmin@gmail.com";
const SUPERADMIN_PASSWORD = "123456";

const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (email === SUPERADMIN_EMAIL && password === SUPERADMIN_PASSWORD) {
    const token = generateToken({ role: "superadmin" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid SuperAdmin credentials" });
  }
};

const createKitchen = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Kitchen name is required" });
  }

  const newKitchen = await Kitchen.create({ name });
  res.status(201).json(newKitchen);
};

const getAllKitchens = async (req, res) => {
  const kitchens = await Kitchen.find();
  res.json(kitchens);
};

const createKitchenAdmin = async (req, res) => {
  const { kitchenId, email, password } = req.body;

  const kitchen = await Kitchen.findById(kitchenId);
  if (!kitchen) {
    return res.status(404).json({ message: "Kitchen not found" });
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res
      .status(400)
      .json({ message: "Admin already exists with this email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    kitchenId,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Admin created successfully", admin });
};

const getAllAdmins = async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
};

export {
  loginSuperAdmin,
  createKitchen,
  getAllKitchens,
  createKitchenAdmin,
  getAllAdmins,
};
