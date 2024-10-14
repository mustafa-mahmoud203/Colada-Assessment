"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../utils/apiError"));
class ErrorHandling {
    static globalErrorHandling(err, req, res, next) {
        err.statusCode = err.statusCode || 500;
        if (err) {
            throw new apiError_1.default(err.message, err.statusCode);
        }
    }
}
exports.default = ErrorHandling.globalErrorHandling;
