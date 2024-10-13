import express,{Express} from "express"
import compression from "compression";
import cors from "cors";

class App {
    private app :Express
    private port:number
    constructor(){
        this.app=express()
        this.port=parseInt(process.env.PORT|| "3000",10)  
        this.configureMiddleware()
        this.startServer()
    }
    private configureMiddleware(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(compression())
        this.app.use(cors())
        this.app.options('*',cors())
    }
    private startServer(): void {
        this.app.listen(this.port,()=>{
            console.log(`Server is running on port ${this.port}`)
        })
    }
}
new App()