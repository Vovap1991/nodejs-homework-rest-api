const User = require("../../models/user");
const crypto = require("node:crypto");
const { sendEmail } = require("../../helpers/index");

async function verify(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "missing required field email" });
  }

  try {
    const user = await User.findOne(email);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.verify === true) {
      return res
        .status(400)
        .send({ message: "Your account has already been verified" });
    }

    const verifyToken = crypto.randomUUID();

    await sendEmail({
      to: email,
      subject: "Email reconfirmation",
      html: `To reconfirm your registration please click the <a href="http://localhost:3000/api/auth/verify/${verifyToken}">link<a/>`,
      text: `To reconfirm your registration please open the link http://localhost:3000/api/auth/verify/${verifyToken}`,
    });

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verifyToken: null,
    });

    res.status(200).send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

module.exports = { verify };
