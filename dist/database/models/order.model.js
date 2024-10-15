"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_model_1 = require("./product.model");
const user_model_1 = require("./user.model");
const orderSchema = new mongoose_1.Schema({
    user: user_model_1.userSchema,
    date: {
        type: Date,
        default: Date.now,
        require: true,
    },
    totalPrice: { type: Number, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    products: [product_model_1.productSchema],
});
orderSchema.index({ location: "2dsphere", user: 1, date: 1 });
const orderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.default = orderModel;
