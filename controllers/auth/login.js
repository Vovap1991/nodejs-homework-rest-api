const User = require("../../models/user");
const { validateRegAndLog } = require("../../validation/auth");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  const { email, password, subscription } = req.body;

  try {
    const response = validateRegAndLog(req.body);

    if (typeof response.error !== "undefined") {
      return res.status(400).send({ message: "missing required fields" });
    }

    const user = await User.findOne({ email }).exec();

    if (user === null) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.status(200).send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { login };
