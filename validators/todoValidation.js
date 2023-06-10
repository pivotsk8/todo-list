const Joi = require("joi");

const createTodoValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  done: Joi.boolean().required(),
});

const updateTodoValidationSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  done: Joi.boolean().required(),
});

const idParamSchema = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

module.exports = {
  createTodoValidationSchema,
  updateTodoValidationSchema,
  idParamSchema,
};
