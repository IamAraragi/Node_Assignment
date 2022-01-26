const Joi = require("joi");

exports.updateTodoSchema = Joi.object({
  description: Joi.string().required(),
  status: Joi.string().required(),
});
