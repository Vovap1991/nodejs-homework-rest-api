const fs = require("node:fs/promises");
const path = require("node:path");
const Jimp = require("jimp");

const User = require("../../models/user");

async function uploadAvatar(req, res, next) {
  const newPath = path.join(
    __dirname,
    "..",
    "..",
    "public/avatars",
    req.file.filename
  );

  try {
    const avatar = await Jimp.read(req.file.path);
    avatar.resize(250, 250).quality(60).write(path.join(req.file.path));

    await fs.rename(req.file.path, newPath);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL: req.file.filename },
      { new: true }
    ).exec();

    if (user === null) {
      res.status(404).send({ message: "Not found" });
    }

    res.status(200).send({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadAvatar };
