import { Schema, model } from "mongoose";
import IProduct from "../../src/interfaces/product.interface";

export const productSchema = new Schema<IProduct>({
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
});
productSchema.index({ category: 1 });
export const productModel: any = model<IProduct>("Product", productSchema);
