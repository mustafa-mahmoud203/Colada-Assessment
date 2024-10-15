"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: {
        id: {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
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
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    products: [
        {
            _id: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
            },
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
        },
    ],
});
orderSchema.index({ location: "2dsphere", user: 1, date: 1 });
const orderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.default = orderModel;
