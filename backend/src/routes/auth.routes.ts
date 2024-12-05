import { Router } from "express";
import AuthController from "../controllers/auth.controllers";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.register);

export default authRoutes;
