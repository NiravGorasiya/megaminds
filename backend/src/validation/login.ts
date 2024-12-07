import { check, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const loginValidationRules: ValidationChain[] = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email."),
  check("password")
    .notEmpty()
    .withMessage("Password is required."),
];

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
