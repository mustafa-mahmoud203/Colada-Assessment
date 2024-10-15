"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        default: "Uncategorized",
    },
});
exports.productSchema.index({ category: 1 });
exports.productModel = (0, mongoose_1.model)("Product", exports.productSchema);
