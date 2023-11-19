const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const userController = require("../../controllers/users/index");

router.get("/current", auth, userController.getCurrent);

module.exports = router;
