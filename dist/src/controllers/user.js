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
class UserController {
    users(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { minOrders, lat, lng, radius, daysRecency } = req.query;
                let { category } = req.query;
                if (!minOrders || !lat || !lng || !radius || !daysRecency) {
                    return next(new apiError_1.default("All fields are required", 400));
                }
                if (!category)
                    category = "Uncategorized";
                const daysRecencyNum = parseInt(daysRecency, 10);
                const startDay = new Date();
                startDay.setDate(startDay.getDate() - daysRecencyNum);
                const topUsers = yield order_model_1.default.aggregate([
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
                            maxDistance: parseFloat(radius),
                            spherical: true,
                        },
                    },
                    {
                        $match: {
                            date: { $gte: startDay },
                        },
                    },
                    {
                        $unwind: "$products",
                    },
                    {
                        $match: {
                            "products.category": category,
                        },
                    },
                    {
                        $group: {
                            _id: "$user",
                            totalOrders: { $sum: 1 },
                            totalPrice: { $sum: "$totalPrice" },
                        },
                    },
                    {
                        $match: {
                            totalOrders: { $gte: parseInt(minOrders, 10) },
                        },
                    },
                    {
                        $sort: {
                            totalPrice: -1,
                        },
                    },
                    {
                        $limit: 5,
                    },
                    {
                        $project: {
                            _id: 0,
                            Name: "$_id.name",
                            Email: "$_id.email",
                            totalOrders: 1,
                            totalPrice: 1,
                        },
                    },
                ]);
                if (!topUsers || topUsers.length === 0) {
                    return next(new apiError_1.default("No users found", 404));
                }
                return res.status(200).json({ data: topUsers });
            }
            catch (error) {
                return next(new apiError_1.default(error.message, error.statusCode || 500));
            }
        });
    }
}
exports.default = UserController;
