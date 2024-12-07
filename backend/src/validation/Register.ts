import { Request, Response, NextFunction } from "express";
import { check, validationResult, ValidationChain } from "express-validator";

export const registerValidationRules: ValidationChain[] = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  check("name")
    .notEmpty()
    .withMessage("Name is required."),
  check("phone")
    .isMobilePhone("any")
    .withMessage("Please enter a valid phone number."),
];

// Middleware to handle validation errors
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
