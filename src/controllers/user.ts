import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";

class UserController{

    public async users(req: Request, res: Response,next: NextFunction) {
        try {
         
          });
        } catch (error:ApiError) {
          throw new ApiError(error.message,error.statusCode);
    
        }
      }
}

export default UserController