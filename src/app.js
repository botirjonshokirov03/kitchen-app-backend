const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbConnection");

const superAdminRoutes = require("./routes/superAdmin.routes");
const adminRoutes = require("./routes/admin.routes");
const workerRoutes = require("./routes/worker.routes");
const workTrackRoutes = require("./routes/workTrack.routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/superAdmin", superAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/workTrack", workTrackRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
