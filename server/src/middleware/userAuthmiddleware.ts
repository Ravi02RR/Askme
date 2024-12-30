import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jsonWebtoken";
import { userModel } from "../model/user.model";

export const userAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(403).json({
        message: "User not authenticated",
      });
    }

    const decodedData = verifyToken(token);

    if (!decodedData) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    const foundUser = await userModel.findOne({
      //@ts-ignore
      username: decodedData.username,
    });
    if (!foundUser) {
      return res.status(403).json({
        message: "User not authenticated",
      });
    }

    //@ts-ignore

    req.userID = foundUser._id;
    next();
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};
