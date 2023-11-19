const Joi = require("joi");

function validateRegAndLog(user) {
  const validationSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
  });

  return validationSchema.validate(user);
}

module.exports = { validateRegAndLog };
