import { Types } from "mongoose";

export interface IProductItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface IProduct {
  name: string;
  category?: string;
  price: number;
}
export default IProductItem;
