import mongoose from "mongoose";

const CheckInSchema = new mongoose.Schema({
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date },
});

const WorkerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["waiter", "cashier"], required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    checkIns: [CheckInSchema], // Work history
  },
  { timestamps: true }
);

export default WorkerSchema;
