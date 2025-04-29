import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    tableNumber: { type: Number, required: true },
    waiterName: { type: String, required: true },
    items: [
      {
        productName: String,
        price: Number,
        quantity: Number,
      },
    ],
    kitchenName: { type: String, required: true },
    serviceFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default OrderSchema;
