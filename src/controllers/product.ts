import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";

class ProductController{
    public async products(req: Request, res: Response,next: NextFunction) {
        try {            
        } catch (error:any) {
          throw new ApiError(error.message,error.statusCode);
    
        }
      }
}

export default ProductController