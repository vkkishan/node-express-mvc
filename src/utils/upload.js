const multer = require("multer");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

exports.upload = multer({ storage: multer.memoryStorage() });

exports.uploadImage = async (file, folderName) => {
  const ext = path.extname(file.originalname);
  const dir = `./uploads/${folderName}/`;
  const tempFile = moment().unix() + ext;
  const image = `${dir}${tempFile}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(image, file.buffer, "base64");
  return tempFile;
};

exports.deleteImage = async (dir) => {
  try {
    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    } else {
      throw Error("Please enter valid path");
    }
  } catch (error) {
    throw error.message;
  }
};
