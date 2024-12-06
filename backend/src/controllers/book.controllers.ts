import { NextFunction, Request, Response } from "express";
import { HTTP_CODE, HTTP_MESSAGE } from "../config/constants";
import CommonHelper from "../helpers/common.helper";
import { Books } from "../models";

const modelName = "Book";

class BookController {
    public static create = async (req: Request, res: Response) => {
        try {
            const { title, author } = req.body;
            if (!title || !author) {
                return CommonHelper.sendResponse(res, false, HTTP_CODE.BAD_REQUEST, {
                    message: "Title, and author are required.",
                });
            }

            // Create the book
            const newBook = await Books.create({
                title,
                author
            });

            return CommonHelper.sendResponse(res, true, HTTP_CODE.CREATED, {
                message: HTTP_MESSAGE.CREATED(modelName),
                data: newBook,
            });
        } catch (error) {
            return CommonHelper.sendResponse(res, false, HTTP_CODE.INTERNAL_SERVER_ERROR, {
                message: HTTP_MESSAGE.SOMETHING_WRONG(),
            });
        }
    };

    public static getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const data = await Books.find();

            return CommonHelper.sendResponse(res, true, HTTP_CODE.OK, {
                message: HTTP_MESSAGE.LISTED(modelName),
                data,
            });
        } catch (error) {
            console.log({ error });
            return CommonHelper.sendResponse(
                res,
                false,
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                { message: HTTP_MESSAGE.SOMETHING_WRONG() }
            );
        }
    };

}

export default BookController;