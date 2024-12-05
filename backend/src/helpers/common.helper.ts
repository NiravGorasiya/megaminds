import { Response } from "express";

class CommonHelper {
  static sendResponse = (
    res: Response,
    success: boolean,
    code: number,
    data: any
  ) => {
    return res.status(code).json({
      success,
      data,
    });
  };

  static JWTPayload = (user: any) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  };
}

export default CommonHelper;
