import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import orderModel from "../../database/models/order.model";

class UserController {
  public async users(req: Request, res: Response, next: NextFunction) {
    try {
      const { minOrders, lat, lng, radius, daysRecency } = req.query;
      let { category } = req.query;
      if (!minOrders || !lat || !lng || !radius || !daysRecency) {
        return next(new ApiError("All fields are required", 400));
      }
      if (!category) category = "Uncategorized";
      const daysRecencyNum: number = parseInt(daysRecency as string, 10);
      const startDay: Date = new Date();
      startDay.setDate(startDay.getDate() - daysRecencyNum);

      const topUsers = await orderModel.aggregate([
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
            maxDistance: parseFloat(radius as string),
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
            totalOrders: { $gte: parseInt(minOrders as string, 10) },
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
        return next(new ApiError("No users found", 404));
      }
      return res.status(200).json({ data: topUsers });
    } catch (error: any) {
      return next(new ApiError(error.message, error.statusCode || 500));
    }
  }
}

export default UserController;
