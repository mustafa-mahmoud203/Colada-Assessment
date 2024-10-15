import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import orderModel from "../../database/models/order.model";

class ProductController {
  public async products(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate, lat, lng, radius, daysRecency } = req.query;
      if (!startDate || !endDate || !lat || !lng || !radius) {
        return next(new ApiError("All fields are required", 400));
      }

      const products = await orderModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [
                parseFloat(lng as string),
                parseFloat(lat as string),
              ],
            },
            distanceField: "distance",
            maxDistance: parseInt(radius as string, 10),
            spherical: true,
          },
        },
        {
          $match: {
            date: {
              $gte: new Date(startDate as string),
              $lte: new Date(endDate as string),
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
        return next(new ApiError("No products found", 404));
      }
      return res.status(200).json({ data: products });
    } catch (error: any) {
      return next(new ApiError(error.message, error.statusCode || 500));
    }
  }
}

export default ProductController;
