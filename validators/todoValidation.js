const Joi = require("joi");

const todoValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  done: Joi.boolean(),
});

module.exports = {
  todoValidation,
};
