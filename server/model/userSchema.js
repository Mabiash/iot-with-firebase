const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  pswrd: Joi.string().min(8).required(),
  idNumber: Joi.string().required(),
});

module.exports = userSchema;
