const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const User = require("../../models/user");
const { validateRegAndLog } = require("../../validation/auth");

async function register(req, res, next) {
  const response = validateRegAndLog(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).send({ message: "missing required fields" });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    await User.create({ email, password: passwordHash, avatarURL });
    res.status(201).send({
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
