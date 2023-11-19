const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const AuthController = require("../../controllers/auth/index");
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);
router.post("/login", jsonParser, AuthController.login);
router.post("/logout", auth, AuthController.logout);

module.exports = router;
