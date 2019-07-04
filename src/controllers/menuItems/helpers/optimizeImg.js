const tinify = require("tinify");
const path = require("path");
const fs = require("fs");

tinify.key = "2yvfglNBbIpLwai4vZClCQ16FGuXyQY8";

const optimizeImagefromUrl = (fileurl, destination) => {
  const source = tinify.fromUrl(fileurl);
  source.toFile(
    path.join(
      destination,
      fileurl
        .substring(fileurl.lastIndexOf("/") + 1)
        .replace(/((\?|#).*)?$/, "") + "-optimized.jpg"
    )
  );
};

const optimizeImagefromFile = (fileObject, from, to) =>
  tinify
    .fromFile(path.join(from, fileObject.originalname))
    .toFile(path.join(to, fileObject.originalname + "-optimized.jpg"))
    .then(() => fs.unlinkSync(path.join(from, fileObject.originalname)));

module.exports = {
  optimizeImagefromFile,
  optimizeImagefromUrl
};
