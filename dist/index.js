"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const errorHandling_1 = __importDefault(require("./middleware/errorHandling"));
const product_route_1 = __importDefault(require("./routers/product.route"));
const user_route_1 = __importDefault(require("./routers/user.route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || "3000", 10);
        this.startServer();
        this.configureMiddleware();
        this.initRoutes();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(errorHandling_1.default);
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.options('*', (0, cors_1.default)());
    }
    initRoutes() {
        this.app.use("/api/users/top-spenders", user_route_1.default);
        this.app.use("/api/products/demand-analysis", product_route_1.default);
        this.app.use("/h", (req, res, next) => {
            res.send("Helllllllllllllllow");
        });
    }
    startServer() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
new App();
