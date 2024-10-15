"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandling {
    static globalErrorHandling(err, req, res, next) {
        err.statusCode = err.statusCode || 500;
        if (err) {
            return res.status(err.statusCode).json({
                message: "Error",
                error: err.message,
            });
        }
    }
}
exports.default = ErrorHandling.globalErrorHandling;
