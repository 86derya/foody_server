const tinify = require("tinify");
const path = require("path");
const util = require("util");
const fs = require("fs");

tinify.key = "2yvfglNBbIpLwai4vZClCQ16FGuXyQY8";

const optimizeImagefromUrl = (fileurl, destination) => {
  const tinifyImagefromUrl = () => {
    const source = tinify.fromUrl(fileurl);
    return source
      .toFile(
        path.join(
          destination,
          fileurl
            .substring(fileurl.lastIndexOf("/") + 1)
            .replace(/((\?|#).*)?$/, "") + "-optimized.jpg"
        )
      )
      .then(
        console.log(
          "tinified from url as: " +
            fileurl
              .substring(fileurl.lastIndexOf("/") + 1)
              .replace(/((\?|#).*)?$/, "") +
            "-optimized.jpg"
        )
      );
  };

  let filePath = "";

  const getFilePath = () => {
    return new Promise((res, rej) => {
      fs.readdir(destination, function(err, files) {
        if (err) {
          console.log("no file");
          rej(err);
        }
        res((filePath = destination + "/" + files.split(",")[1]));
      });
    });
  };

  return tinifyImagefromUrl()
    .then(() => getFilePath())
    .then(() => filePath);
};

const optimizeImagefromFile = (fileObject, from, to) => {
  const tinifyImagefromFile = () => {
    return tinify
      .fromFile(path.join(from, fileObject.originalname))
      .toFile(path.join(to, fileObject.originalname + "-optimized.jpg"))
      .then(() =>
        fs.unlinkSync(from + "/" + fileObject.originalname, function(error) {
          if (error) {
            throw error;
          }
        })
      )
      .then(() =>
        console.log(
          "tinified from file as: " + fileObject.originalname + "-optimized.jpg"
        )
      );
  };

  let filePath = "";

  const getFilePath = () => {
    return new Promise((res, rej) => {
      fs.readdir(to, function(err, files) {
        if (err) {
          console.log("no file");
          rej(err);
          throw err;
        }
        if (file) res((filePath = to + "/" + files.split(",")[1]));
      });
    });
  };

  return tinifyImagefromFile()
    .then(() => getFilePath())
    .then(() => filePath)
    .catch(err => {
      throw err;
    });
};

module.exports = {
  optimizeImagefromFile,
  optimizeImagefromUrl
};
