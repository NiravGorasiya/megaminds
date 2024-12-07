import { Router } from "express";
import BookController from "../controllers/book.controllers";
import { bookValidationRules, validate } from "../validation/book";

const bookRoutes = Router();

bookRoutes.post("/create", bookValidationRules, validate, BookController.create);
bookRoutes.get("/all", BookController.getAll);

export default bookRoutes;
