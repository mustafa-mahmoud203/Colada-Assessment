import { Types } from "mongoose";
import { IProductItem } from "./product.interface";

interface IOrder {
  user: Types.ObjectId;
  date: Date;
  totalPrice: number;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  products: IProductItem[];
}
export default IOrder;
