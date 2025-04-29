const mongoose = require("mongoose");
const CategorySchema = require("../models/Admin/Category");
const ProductSchema = require("../models/Admin/Product");
const WorkerSchema = require("../models/Admin/Worker");
const TableSchema = require("../models/Admin/Table");
const OrderSchema = require("../models/Admin/Order");

const connections = {}; // Cache all dynamic connections

const getKitchenDbConnection = async (kitchenId) => {
  if (!kitchenId) {
    throw new Error("Kitchen ID is required to connect");
  }

  if (connections[kitchenId]) {
    return connections[kitchenId];
  }

  const kitchenDbName = `kitchen_${kitchenId}`;
  const conn = await mongoose.createConnection(
    `mongodb://127.0.0.1:27017/${kitchenDbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  // Register all models
  conn.model("Category", CategorySchema);
  conn.model("Product", ProductSchema);
  conn.model("Worker", WorkerSchema);
  conn.model("Table", TableSchema);
  conn.model("Order", OrderSchema);

  connections[kitchenId] = conn;

  return conn;
};

module.exports = { getKitchenDbConnection };
