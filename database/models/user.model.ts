import {Schema,model} from "mongoose";

const userSchema:Schema= new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    }
})

const userModel: any = model("User",userSchema)
export default userModel;