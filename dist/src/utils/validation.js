"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validatoinError_1 = __importDefault(require("../middleware/validatoinError"));
// Validation rules
const validateProductQueryParams = [
    (0, express_validator_1.query)("startDate")
        .isISO8601()
        .withMessage("Invalid startDate format.")
        .notEmpty()
        .withMessage("startDate is required."),
    (0, express_validator_1.query)("endDate")
        .isISO8601()
        .withMessage("Invalid endDate format")
        .notEmpty()
        .withMessage("endDate is required."),
    (0, express_validator_1.query)("lat")
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude must be between -90 and 90.")
        .notEmpty()
        .withMessage("Latitude is required."),
    (0, express_validator_1.query)("lng")
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude must be between -180 and 180.")
        .notEmpty()
        .withMessage("Longitude is required."),
    (0, express_validator_1.query)("radius")
        .isFloat({ gt: 0 })
        .withMessage("Radius must be a positive number.")
        .notEmpty()
        .withMessage("Radius is required."),
    (0, express_validator_1.query)("daysRecency")
        .optional()
        .isInt({ min: 0 })
        .withMessage("daysRecency must be a non-negative integer."),
    validatoinError_1.default,
];
exports.default = validateProductQueryParams;
