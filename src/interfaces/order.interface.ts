import { Types } from "mongoose";

interface IOrder {
  user: Types.ObjectId;
  date: Date;
  totalPrice: number;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  products: Types.ObjectId[];
}
export default IOrder;
