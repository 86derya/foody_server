const multer = require("multer");
const fs = require("fs");
const path = require("path");
const util = require("util");
const tinify = require("tinify");

const { usersSrc } = require("./pathes");
const { getUserNameById } = require("./helpers");

tinify.key = "2yvfglNBbIpLwai4vZClCQ16FGuXyQY8";

const folderPathes = {
  original: path.join(__dirname, "tmp"),
  optimized: path.join(__dirname, "tmp/optimized")
};

const renameFile = util.promisify(fs.rename);

const storage = multer.diskStorage({
  // определяем папку куда сохранять временное изображение

  destination: (req, file, next) => {
    next(null, folderPathes.original);
  },
  // определяем имя файла
  filename: (req, file, next) => {
    next(null, file.originalname);
  }
});

// Применяем настройки
const upload = multer({ storage });
// upload.single("file");

// const moveImage = fileObject => {
//   const tempFilePath = path.join(TEMP_IMAGE_FOLDER, fileObject.originalname);
//   const newFilePath = path.join(ORIGINAL_IMAGE_FOLDER, fileObject.originalname);

//   return renameFile(tempFilePath, newFilePath)
//     .then(() => userImageFolderName)
//     .catch(error => console.log(error));
// };

const saveImage = (req, res) => {
  // Берем файл
  const fileObject = req.file;
  const fileurl = req.body.urlimg;
  console.log("url: " + fileurl);

  // Берем другие данные что пришли
  const userId = req.body.userId;
  console.log(userId);
  const userName = getUserNameById(userId);
  console.log(userId);
  if (!userName)
    return res.json({
      status: `failed. User with such ID is not found`
    });

  moveImage(fileObject, userId).then(userImageFolderName => {
    if (fileurl) {
      const source = tinify.fromUrl(fileurl);
      console.log();
      source
        .toFile(
          path.join(
            usersSrc,
            userName,
            userImageFolderName,
            fileurl
              .substring(fileurl.lastIndexOf("/") + 1)
              .replace(/((\?|#).*)?$/, "") + "-optimized.jpg"
          )
        )
        .then(() =>
          res.json({
            status: `was saved in folder: db/users/${userName}/${userImageFolderName}`
          })
        );
    }
    tinify
      .fromFile(
        path.join(
          usersSrc,
          userName,
          userImageFolderName,
          fileObject.originalname
        )
      )
      .toFile(
        path.join(
          usersSrc,
          userName,
          userImageFolderName,
          fileObject.originalname + "-optimized.jpg"
        )
      )
      .then(() =>
        fs.unlinkSync(
          path.join(
            usersSrc,
            userName,
            userImageFolderName,
            fileObject.originalname
          )
        )
      )
      .then(() =>
        res.json({
          status: `was saved in folder: db/users/${userName}/${userImageFolderName}`
        })
      );
  });
};

// добавляем промежуточный обработчик для post-multipart запросов
module.exports = () => [upload.single("file"), saveImage];
