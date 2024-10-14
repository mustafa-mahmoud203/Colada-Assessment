import express,{Express} from "express"
import compression from "compression";
import cors from "cors";
import globalErrorHandling from "./middleware/errorHandling";

import productRoutes from "./routers/product.route";
import userRoute from "./routers/user.route";

class App {
    private app :Express
    private port:number
    constructor(){
        this.app=express()
        this.port=parseInt(process.env.PORT|| "3000",10)  
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
      }
    private startServer(): void {
        this.app.listen(this.port,()=>{
            console.log(`Server is running on port ${this.port}`)
        })
    }
}
new App()