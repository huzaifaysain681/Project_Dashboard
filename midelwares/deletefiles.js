const fs = require("fs");

exports.deleteFiles = (req) => {
  try {
    const { files, file } = req;
    if (file) {
      fs.unlink(file.path, (err) => {
        console.log(err);
      });
    }
    if (Array.isArray(files)) {
      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        fs.unlink(element.path, () => {});
      }
    }
    if (typeof files === "object") {
      for (let i in files) {
        var element = files[i];
        if (Array.isArray(element)) {
          for (let i = 0; i < element.length; i++) {
            const f = element[i];
            fs.unlink(f.path, () => {});
          }
        } else if (typeof element === "object")
          fs.unlink(element.path, () => {});
      }
    }
  } catch (error) {
    console.log(error);
  }
};
