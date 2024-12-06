import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { HTTP_CODE, HTTP_MESSAGE } from "../config/constants";
import CommonHelper from "../helpers/common.helper";
import { Users } from "../models";

class AuthMiddleware {
  static validateToken = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer = req.headers.authorization;
      if (!bearer) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.UNAUTHORIZED, {
          message: HTTP_MESSAGE.UNAUTHORIZED(),
        });
      }
      const token = bearer.replace("Bearer ", "");

      if (!process.env.SECRET_KEY) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.BAD_REQUEST, {
          message: HTTP_MESSAGE.ENVIRONMENT(),
        });
      }

      const decoded: any = await jwt.verify(token, process.env.SECRET_KEY);

      if (!decoded) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.UNAUTHORIZED, {
          message: HTTP_MESSAGE.UNAUTHORIZED(),
        });
      }
      let user = await Users.findById(decoded._id);
      req.auth_user = user;
      next();
    } catch (error) {
      return CommonHelper.sendResponse(res, false, HTTP_CODE.UNAUTHORIZED, {
        message: HTTP_MESSAGE.UNAUTHORIZED(),
      });
    }
  };
}

export default AuthMiddleware;
