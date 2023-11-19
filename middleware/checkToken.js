const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const user = await User.findOne({ token }).exec();

  if (user === null) {
    return res.status(404).send({ message: "Not Found" });
  }
}

module.exports = { checkToken };
