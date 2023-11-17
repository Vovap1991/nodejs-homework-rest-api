const User = require("../../models/user");
const { validateRegAndLog } = require("../../validation/auth");

const bcrypt = require("bcrypt");

async function login(req, res, next) {
  const { email, password } = req.body;

  const responseIfMistake = res
    .status(401)
    .send({ message: "Email or password is incorrect" });

  try {
    const response = validateRegAndLog(req.body);

    if (typeof response.error !== "undefined") {
      return res.status(400).send({ message: "missing required fields" });
    }

    const user = await User.findOne({ email }).exec();

    if (user === null) {
      return responseIfMistake;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return responseIfMistake;
    }

    res.status(200).send({
      token: "exampletoken",
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { login };
