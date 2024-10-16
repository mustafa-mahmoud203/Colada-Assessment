"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../controllers/product"));
class ProductRouters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.productController = new product_1.default();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", this.productController.products.bind(this.productController));
    }
}
exports.default = new ProductRouters().router;
