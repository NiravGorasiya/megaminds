import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { HTTP_CODE, HTTP_MESSAGE } from "../config/constants";
import CommonHelper from "../helpers/common.helper";
import { Users } from "../models";

const modelName = "User";

class AuthController {
  /**
   * register
   */
  public static register = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { email, password, name, phone } = req.body;
      const userExists = await Users.findOne({
        email: { $regex: "^" + email + "$", $options: "i" },
      });

      if (userExists) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.BAD_REQUEST, {
          message: HTTP_MESSAGE.ALREADY_EXIST_WITH(modelName, "email"),
        });
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await Users.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        phone,
      });

      return CommonHelper.sendResponse(res, true, HTTP_CODE.CREATED, {
        message: HTTP_MESSAGE.CREATED(modelName),
      });
    } catch (error) {
      return CommonHelper.sendResponse(
        res,
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        { message: HTTP_MESSAGE.SOMETHING_WRONG() }
      );
    }
  };

  /**
   * login
   */
  public static login = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({
        email: { $regex: "^" + email + "$", $options: "i" },
      });

      if (!user) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.NOT_FOUND, {
          message: HTTP_MESSAGE.INVALID_CREDENTAILS(),
        });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.NOT_FOUND, {
          message: HTTP_MESSAGE.INVALID_CREDENTAILS(),
        });
      }

      if (!process.env.SECRET_KEY) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.BAD_REQUEST, {
          message: HTTP_MESSAGE.ENVIRONMENT(),
        });
      }

      const userWithoutPassword = user.toObject() as { [key: string]: any };
      delete userWithoutPassword.password;
      
      const token = jwt.sign(CommonHelper.JWTPayload(user), process.env.SECRET_KEY);
      return CommonHelper.sendResponse(res, true, HTTP_CODE.OK, {
        message: HTTP_MESSAGE.LOGIN_SUCCESS(),
        token,
        user:userWithoutPassword
      });
    } catch (error) {
      return CommonHelper.sendResponse(
        res,
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        { message: HTTP_MESSAGE.SOMETHING_WRONG() }
      );
    }
  };
}

export default AuthController;
