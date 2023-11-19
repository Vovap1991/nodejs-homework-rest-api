const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/users/index");
const { checkToken } = require("../../middleware/checkToken");

router.get("/users/current", checkToken, UserController.getCurrent);
