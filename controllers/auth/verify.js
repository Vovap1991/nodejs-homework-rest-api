const User = require("../../models/user");

async function verify(req, res, next) {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verifyToken: token }).exec();

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

    res.status(200).send({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}

module.exports = { verify };
