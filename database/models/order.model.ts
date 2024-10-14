import { Schema, model } from "mongoose";
import IOrder from "../../src/interfaces/order.interface";

const orderSchema: Schema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
    require: true,
  },
  totalPrice: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ["point"],
    },
    coordinates: [Number, Number],
  },

  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

orderSchema.index({ location: "2dsphere" });
const orderModel = model<IOrder>("Order", orderSchema);

export default orderModel;
