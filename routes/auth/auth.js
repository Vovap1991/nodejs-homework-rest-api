const express = require("express");
const router = express.Router();

const AuthController = require("../../controllers/auth/index");
const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);

module.exports = router;
