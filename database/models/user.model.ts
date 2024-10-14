import { Schema, model } from "mongoose";
import IUser from "../../src/interfaces/user.interface";

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const userModel: any = model<IUser>("User", userSchema);
export default userModel;
