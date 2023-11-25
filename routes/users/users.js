const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const upload = require("../../middleware/upload");

const userController = require("../../controllers/users/index");

router.get("/current", userController.getCurrent);
router.patch("/", userController.updateSubscription);
router.patch("/avatars", upload.single("avatar"), userController.uploadAvatar);

module.exports = router;
