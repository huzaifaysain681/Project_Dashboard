var multer = require("multer");
var uuid = require("uuid");
var mimeType = ["image/png", "image/jpg", "image/jpeg"];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var directory = "public/images/";
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v4() + file.originalname);
  },
});
exports.uploadImages = multer({
  storage: storage,
});

exports.uploadTemporary = multer({ storage: multer.memoryStorage() });
