import { Schema, model } from "mongoose";
import IProduct from "../../src/interfaces/product.interface";

const productSchema = new Schema<IProduct>({
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
const productModel: any = model<IProduct>("Product", productSchema);

export default productModel;
