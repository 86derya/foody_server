const path = require("path");
const fs = require("fs");
const multer = require("multer");

const MENU_ITEM = require("../../modules/db/schemas/menu-item");
const { createdFailed, createdSuccess } = require("./configs/responses");
const {
  getNames,
  getIds,
  getAllIngredientsEntitiesFromDb,
  createIngredient,
  getNotExistIngredients,
  getExistIngredientsIds
} = require("./helpers/handleIngredients");
const {
  optimizeImagefromFile,
  optimizeImagefromUrl
} = require("./helpers/optimizeImg");

const folderPathes = {
  original: path.join(__dirname, "tmp"),
  optimized: path.join(__dirname, "tmp/optimized")
};

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

const createMenuItem = (request, response) => {
  const menuItem = request.body;
  const imgFile = request.file;
  const imgUrl = request.body.imageUrl;
  let existIngrIds = [];
  let notExistIngrNames = [];
  const clientIngrlist = menuItem.selectedIngredients.split(",");
  let createdIngrds = [];
  let jointListIds = [];
  let newMenuItem = {};
  let imagePath = "";

  const compressImage = () =>
    new Promise((resolve, reject) => {
      if (imgUrl) {
        resolve(optimizeImagefromUrl(imgUrl, folderPathes.optimized));
      } else if (imgFile) {
        resolve(
          optimizeImagefromFile(
            imgFile,
            folderPathes.original,
            folderPathes.optimized
          )
        );
      } else {
        resolve();
      }
    });

  compressImage()
    .then(savedImagePath => {
      imagePath = savedImagePath;
    })
    .then(() => getAllIngredientsEntitiesFromDb())
    .then(resp => {
      dbIngredientsEntities = resp;
      dbIngredientsNames = getNames(resp);
      notExistIngrNames = getNotExistIngredients(resp, clientIngrlist);
      existIngrIds = getExistIngredientsIds(resp, clientIngrlist);
    })
    .then(() => {
      return Promise.all(
        notExistIngrNames.map(async i =>
          createdIngrds.push(await createIngredient(i))
        )
      );
    })
    .then(async () => {
      jointListIds = [...existIngrIds, ...getIds(createdIngrds)];
      newMenuItem = {
        ...menuItem,
        ingredients: jointListIds
      };
      imagePath
        ? (newMenuItem.image = {
            data: await fs.readFileSync(imagePath),
            contentType: "image/png"
          })
        : null;
    })
    .then(() => {
      return MENU_ITEM.create(newMenuItem, (err, createdItem) => {
        if (err) {
          console.log(err);
          imagePath
            ? fs.unlink(imagePath, function(err) {
                if (err) throw err;
                console.log("File deleted!");
                return createdFailed(response, err.message || err);
              })
            : createdFailed(response, err.message || err);
          throw err;
        }
        return imagePath
          ? fs.unlink(imagePath, function(err) {
              if (err) throw err;
              console.log("File deleted!");
              console.log(" item created");
              return createdSuccess(response, createdItem);
            })
          : createdSuccess(response, createdItem);
      });
    })
    .catch(err => {
      console.log(err);
      // fs.unlinkSync(imagePath);
      createdFailed(response, err.message);
    });
};

module.exports = () => [upload.single("imageFile"), createMenuItem];
