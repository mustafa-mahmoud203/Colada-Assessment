import { Router } from "express";
import ProductController from "../controllers/product";

class ProductRouters{
    public router :Router
    private productController: ProductController;

    constructor(){
        this.router = Router();
        this.productController = new ProductController();

        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get("/", this.productController.products);
       
    }
}
export default new ProductRouters().router