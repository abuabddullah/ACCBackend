const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "folderName_images/", // folder name to store files but it must be pre-created before uploading
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }, // generate unique file name
});

const uploader = multer({
  storage, // showing storage and naming function
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; // allowed file extensions
    const extName = path.extname(file.originalname); // get file extension name from original file name of frontend
    if (fileTypes.test(extName)) {
      return cb(null, true); // if file extension name is matched with allowed file extensions then return true
    } else {
      cb(new Error("Only jpeg|jpg|png|gif images are allowed")); // if file extension name is not matched with allowed file extensions then return error
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB max file size
  },
});

module.exports = uploader;
