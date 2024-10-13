import {Schema,model} from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        default:"Uncategorized"
    }

})

const productModel: any = model("Product",productSchema)

export default productModel;