import mongoose from "mongoose"

// Connect to MongoDB
const dbConnectino= async ()=>{
    try {
        await mongoose.connect(process.env.ME_CONFIG_MONGODB_URL as string)
        console.log("Data base connected...............");    
    }
    catch (error) {
        console.log(`fail to connect data base........${error}`);
    }
}

export default dbConnectino