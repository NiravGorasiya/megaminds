import { Router } from "express";
import AuthController from "../controllers/auth.controllers";
import { registerValidationRules, validate } from "../validation/Register"
import { loginValidationRules } from "../validation/login";

const authRoutes = Router();

authRoutes.post("/login", loginValidationRules, validate, AuthController.login);
authRoutes.post("/register", registerValidationRules, validate, AuthController.register);

export default authRoutes;
