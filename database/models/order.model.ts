import { Schema, model } from "mongoose";
import IOrder from "../../src/interfaces/order.interface";
import { productSchema } from "./product.model";
import { userSchema } from "./user.model";

const orderSchema: Schema = new Schema<IOrder>({
  user: userSchema,
  date: {
    type: Date,
    default: Date.now,
    require: true,
  },
  totalPrice: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },

  products: [productSchema],
});

orderSchema.index({ location: "2dsphere", user: 1, date: 1 });
const orderModel = model<IOrder>("Order", orderSchema);

export default orderModel;
