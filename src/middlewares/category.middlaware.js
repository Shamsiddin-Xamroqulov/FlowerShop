import {categorySchema} from "../utils/validation.js"

export function validateCategory(req, res, next) {
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }
    next();
}