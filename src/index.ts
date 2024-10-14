import express,{Express} from "express"
import compression from "compression";
import cors from "cors";
import globalErrorHandling from "./middleware/errorHandling";
import dbConnection from "../database/connection";
import productRoutes from "./routers/product.route";
import userRoute from "./routers/user.route";
import 'dotenv/config'
import mongoose from "mongoose";

class App {
    private app :Express
    private port:number
    constructor(){
        this.app=express()
        this.port=parseInt(process.env.PORT|| "3000",10)
        dbConnection()
        this.startServer()
        this.configureMiddleware()
        this.initRoutes()
      
    }
    private configureMiddleware(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(globalErrorHandling)
 
        this.app.use(compression())
        this.app.use(cors())
        this.app.options('*',cors())
    }
    private initRoutes() {
        this.app.use("/api/users/top-spenders", userRoute);
        this.app.use("/api/products/demand-analysis", productRoutes);
        this.app.use("/h",(req, res, next) => {
          res.send("Helllllllllllllllo")          
        });
      }
    private startServer(){
      
       this.app.listen(this.port, ()=>{
           
            console.log(`Server is running on port 3000`)
        })
    }
}
new App()