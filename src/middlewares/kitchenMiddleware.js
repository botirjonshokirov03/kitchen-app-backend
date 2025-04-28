const { getKitchenDbConnection } = require("../config/dynamicConnection");

const kitchenDbMiddleware = async (req, res, next) => {
  try {
    const kitchenId = req.user.kitchenId;

    if (!kitchenId) {
      return res.status(400).json({ message: "Kitchen ID not found in token" });
    }

    // Get or create a dynamic connection for this kitchen
    const kitchenDb = await getKitchenDbConnection(kitchenId);

    // Attach it to request
    req.kitchenDb = kitchenDb;

    next();
  } catch (error) {
    console.error("Kitchen DB connection error:", error.message);
    res.status(500).json({ message: "Kitchen database connection error" });
  }
};

module.exports = { kitchenDbMiddleware };
