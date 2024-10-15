"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        default: Date.now,
        require: true,
    },
    totalPrice: { type: Number, required: true },
    location: {
        type: {
            type: String,
            enum: ["point"],
        },
        coordinates: {
            type: [Number, Number],
            default: [0, 0],
        },
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
            },
        },
    ],
});
orderSchema.index({ location: "2dsphere", user: 1, date: 1 });
const orderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.default = orderModel;
