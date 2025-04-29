import mongoose from "mongoose";

const KitchenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Kitchen", KitchenSchema);
