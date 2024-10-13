import { Schema, model } from "mongoose";

const orderSchema: Schema = new Schema({
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
      quantity: Number,
    },
  ],
});

const orderModel = model("Order", orderSchema);

export default orderModel;
