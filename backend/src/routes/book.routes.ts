import { Router } from "express";
import BookController from "../controllers/book.controllers";

const bookRoutes = Router();

bookRoutes.post("/create", BookController.create);
bookRoutes.get("/all", BookController.getAll);

export default bookRoutes;
