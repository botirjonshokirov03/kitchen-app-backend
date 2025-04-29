import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";

import superAdminRoutes from "./routes/superAdmin.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import workerRoutes from "./routes/worker.routes.js";
import workTrackRoutes from "./routes/workTrack.routes.js";

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

// 🚀 Only start server if not testing
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export { app };
