import { Schema, model } from "mongoose";
import IOrder from "../../src/interfaces/order.interface";

const orderSchema: Schema = new Schema<IOrder>({
  user: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
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
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },

  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        default: "Uncategorized",
      },
    },
  ],
});

orderSchema.index({ location: "2dsphere", user: 1, date: 1 });
const orderModel = model<IOrder>("Order", orderSchema);

export default orderModel;
