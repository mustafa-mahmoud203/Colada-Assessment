"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});
exports.userModel = (0, mongoose_1.model)("User", exports.userSchema);
exports.default = exports.userModel;
