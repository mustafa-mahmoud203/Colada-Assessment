import { NextFunction, Response,Request } from "express";
import ApiError from "../utils/apiError";

class ErrorHandling {
   public static  globalErrorHandling(err:any,req:Request,res:Response,next:NextFunction): void{
    err.statusCode=err.statusCode||500
    if(err){
        throw new ApiError(err.message,err.statusCode)
    }
    }
}
export default ErrorHandling.globalErrorHandling