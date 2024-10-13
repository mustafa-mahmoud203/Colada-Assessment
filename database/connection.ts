import mongoose from "mongoose"

// Connect to MongoDB
const dbConectino= async ()=>{
    try {
        await mongoose.connect("mongodb://mongo:27017/colada")
        console.log("Data base connected...............");    
    }
    catch (error) {
        console.log(`fail to connect data base........${error}`);
    }
}
