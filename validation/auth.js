const Joi = require("joi");

function validateRegistration(user) {
  const validationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
  });

  return validationSchema.validate(user);
}

module.exports = { validateRegistration };
