import { check, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const bookValidationRules: ValidationChain[] = [
  check("title")
    .notEmpty()
    .withMessage("Title is required."),
  check("author")
    .notEmpty()
    .withMessage("Author is required."),
];

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
