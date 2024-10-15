import { NextFunction, Response, Request } from "express";
import ApiError from "../utils/apiError";

class ErrorHandling {
  public static globalErrorHandling(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): any {
    err.statusCode = err.statusCode || 500;
    if (err) {
      return res.status(err.statusCode).json({
        message: "Error",
        error: err.message,
      });
    }
  }
}
export default ErrorHandling.globalErrorHandling;
