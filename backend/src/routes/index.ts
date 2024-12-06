import { Router } from "express";
import authRoutes from "./auth.routes";
import bookRoutes from "./book.routes";
import AuthMiddleware from "../middlewares/auth";
const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/book", AuthMiddleware.validateToken, bookRoutes)

export default apiRouter;
