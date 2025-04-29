import mongoose from "mongoose";
import CategorySchema from "../models/Admin/Category.js";
import ProductSchema from "../models/Admin/Product.js";
import WorkerSchema from "../models/Admin/Worker.js";
import TableSchema from "../models/Admin/Table.js";
import OrderSchema from "../models/Admin/Order.js";

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

export { getKitchenDbConnection };
