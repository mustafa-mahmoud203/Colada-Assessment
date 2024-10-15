"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../utils/apiError"));
const order_model_1 = __importDefault(require("../../database/models/order.model"));
class ProductController {
    products(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate, lat, lng, radius, daysRecency } = req.query;
                if (!startDate || !endDate || !lat || !lng || !radius) {
                    return next(new apiError_1.default("All fields are required", 400));
                }
                const products = yield order_model_1.default.aggregate([
                    {
                        $geoNear: {
                            near: {
                                type: "Point",
                                coordinates: [
                                    parseFloat(lng),
                                    parseFloat(lat),
                                ],
                            },
                            distanceField: "distance",
                            maxDistance: parseInt(radius, 10),
                            spherical: true,
                        },
                    },
                    {
                        $match: {
                            date: {
                                $gte: new Date(startDate),
                                $lte: new Date(endDate),
                            },
                        },
                    },
                    {
                        $addFields: {
                            dayOfWeek: { $dayOfWeek: "$date" },
                        },
                    },
                    { $unwind: "$products" },
                    {
                        $group: {
                            _id: {
                                category: "$products.category",
                                distance: "$distance",
                                dayOfWeek: "$dayOfWeek",
                            },
                            totalRevenue: { $sum: { $multiply: ["$products.price", 1] } },
                            uniqueUsers: { $addToSet: "$user.id" },
                        },
                    },
                    {
                        $addFields: {
                            uniqueUserCount: { $size: "$uniqueUsers" },
                        },
                    },
                    {
                        $sort: { totalRevenue: -1 },
                    },
                    {
                        $project: {
                            totalRevenue: 1,
                            uniqueUsersCount: 1,
                        },
                    },
                    { $limit: 200 },
                ]);
                if (!products || products.length === 0) {
                    return next(new apiError_1.default("No products found", 404));
                }
                return res.status(200).json({ data: products });
            }
            catch (error) {
                return next(new apiError_1.default(error.message, error.statusCode || 500));
            }
        });
    }
}
exports.default = ProductController;
