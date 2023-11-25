const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const userController = require("../../controllers/users/index");

router.get("/current", auth, userController.getCurrent);
router.patch("/", auth, userController.updateSubscription);
router.patch("/avatars", userController.uploadAvatar);

module.exports = router;
