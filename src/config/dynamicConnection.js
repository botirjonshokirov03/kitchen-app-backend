const mongoose = require("mongoose");
const CategorySchema = require("../models/Admin/Category");
const ProductSchema = require("../models/Admin/Product");

const connections = {}; // Cache all dynamic connections

/**
 * Get or create a dynamic connection to a kitchen database
 * @param {string} kitchenId - Kitchen ID
 * @returns {mongoose.Connection} - Kitchen-specific database connection
 */
const getKitchenDbConnection = async (kitchenId) => {
  if (!kitchenId) {
    throw new Error("Kitchen ID is required to connect");
  }

  // If already connected, return it
  if (connections[kitchenId]) {
    return connections[kitchenId];
  }

  // Create a new connection
  const kitchenDbName = `kitchen_${kitchenId}`;
  const conn = await mongoose.createConnection(
    `mongodb://127.0.0.1:27017/${kitchenDbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  // Attach models to this connection
  conn.model("Category", CategorySchema);
  conn.model("Product", ProductSchema);

  // Save it in cache
  connections[kitchenId] = conn;

  return conn;
};

module.exports = { getKitchenDbConnection };
