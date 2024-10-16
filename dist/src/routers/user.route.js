"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
class UserRouters {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new user_1.default();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", this.userController.users.bind(this.userController));
    }
}
exports.default = new UserRouters().router;
