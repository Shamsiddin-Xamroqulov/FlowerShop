import Joi from "joi";

let regexPhone = /^\+998((9[0-9])|88)[0-9]{7}$/;
let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const userValidator = Joi.object({
  first_name: Joi.string()
    .max(255)
    .required()
    .messages({
      'string.base': 'First name must be a string.',
      'string.empty': 'First name is required.',
      'string.max': 'First name must not exceed 255 characters.',
      'any.required': 'First name is a required field.',
    }),

  last_name: Joi.string()
    .max(255)
    .required()
    .messages({
      'string.base': 'Last name must be a string.',
      'string.empty': 'Last name is required.',
      'string.max': 'Last name must not exceed 255 characters.',
      'any.required': 'Last name is a required field.',
    }),

  phone: Joi.string()
    .pattern(regexPhone)
    .required()
    .messages({
      'string.pattern.base': 'Phone number format is invalid.',
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number is a required field.',
    }),

  email: Joi.string()
    .email()
    .pattern(regexEmail)
    .required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.pattern.base': 'Email format is invalid.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is a required field.',
    }),

  password: Joi.string()
    .max(20)
    .required()
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.',
      'string.max': 'Password must not exceed 20 characters.',
      'any.required': 'Password is a required field.',
    }),

  role_id: Joi.number()
    .valid(1, 2)
    .required()
    .messages({
      'number.base': 'Role ID must be a number.',
      'any.only': 'Role ID must be either 1 (Admin) or 2 (Customer).',
      'any.required': 'Role ID is a required field.',
    }),
});

export const categorySchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    "string.base": `"name" must be a string`,
    "string.empty": `"name" cannot be empty`,
    "string.min": `"name" must be at least 2 characters long`,
    "any.required": `"name" is required`,
  }),
  description: Joi.string().min(5).required().messages({
    "string.empty": `"description" cannot be empty`,
    "string.min": `"description" must be at least 5 characters long`,
    "any.required": `"description" is required`,
  }),
  count: Joi.number().integer().min(0).default(0).messages({
    "number.base": `"count" must be a number`,
    "number.min": `"count" cannot be negative`,
  }),
  img_url: Joi.string().uri().required().messages({
    "string.uri": `"img_url" must be a valid URL`,
    "any.required": `"img_url" is required`,
  }),
});
