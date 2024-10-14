import { Types } from "mongoose";

interface IUser {
  name: string;
  email: string;
  orders: Types.ObjectId[];
}
export default IUser;
