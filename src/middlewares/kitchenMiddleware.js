const { getKitchenDbConnection } = require("../config/dynamicConnection");

const kitchenDbMiddleware = async (req, res, next) => {
  try {
    let kitchenId;

    if (req.user && req.user.kitchenId) {
      // If token exists (Admin / SuperAdmin logged in)
      kitchenId = req.user.kitchenId;
    } else if (req.body.kitchenId) {
      // If no token (Worker login) — accept kitchenId from request body
      kitchenId = req.body.kitchenId;
    } else {
      return res
        .status(400)
        .json({ message: "Kitchen ID not found in token or body" });
    }

    const kitchenDb = await getKitchenDbConnection(kitchenId);

    req.kitchenDb = kitchenDb;

    next();
  } catch (error) {
    console.error("Kitchen DB connection error:", error.message);
    res.status(500).json({ message: "Kitchen database connection error" });
  }
};

module.exports = { kitchenDbMiddleware };
