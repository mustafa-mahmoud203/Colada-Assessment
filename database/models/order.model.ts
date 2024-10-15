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
    coordinates: {
      type: [Number, Number],
      default: [0, 0],
    },
  },

  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
});

orderSchema.index({ location: "2dsphere", user: 1, date: 1 });
const orderModel = model<IOrder>("Order", orderSchema);

export default orderModel;
