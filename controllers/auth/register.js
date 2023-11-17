const User = require("../../models/user");
const { validateRegistration } = require("../../validation/auth");

async function register(req, res, next) {
  const response = validateRegistration(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).send({ message: "missing required fields" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    await User.create({ email, password });
    res.status(201).send({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
