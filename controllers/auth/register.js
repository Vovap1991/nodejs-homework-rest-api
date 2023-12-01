const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const crypto = require("node:crypto");

const { sendEmail } = require("../../helpers/index");

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

    const verifyToken = crypto.randomUUID();

    await sendEmail({
      to: email,
      subject: "Welcome to your own Contacts book",
      html: `To confirm your registration please click the <a href="http://localhost:3000/api/auth/verify/${verifyToken}">link<a/>`,
      text: `To confirm your registration please open the link http://localhost:3000/api/auth/verify/${verifyToken}`,
    });

    await User.create({
      email,
      password: passwordHash,
      verifyToken,
      avatarURL,
    });
    res.status(201).send({
      user: {
        email: email,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
