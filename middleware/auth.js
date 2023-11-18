const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return req.status(401).send({ message: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return req.status(401).send({ message: "Invalid token" });
    }

    req.user = decode;

    next();
  });
}

module.exports = auth;
