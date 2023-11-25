const path = require("node:path");

const crypto = require("node:crypto");

const multer = require("multer");

const tmpPath = path.join(__dirname, "..", "tmp");

console.log(tmpPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpPath);
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();
    const mutedFileName = `${basename}-${suffix}${extname}`;

    cb(null, mutedFileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
