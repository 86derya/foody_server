const path = require("path");
const multer = require("multer");
const MENU_ITEM = require("../../modules/db/schemas/menu-item");
const INGREDIENT = require("../../modules/db/schemas/ingredient");
// const { createIngredient } = require("../ingredients/createIngredient");
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

const { createdFailed, createdSuccess } = require("./configs/responses");

const createMenuItem = (request, response) => {
  const menuItem = request.body;
  const imgFile = request.file;
  const imgUrl = request.body.imageUrl;
  imgFile
    ? optimizeImagefromFile(
        imgFile,
        folderPathes.original,
        folderPathes.optimized
      ).then(() =>
        console.log("FileObject optimized by Tinify: " + imgFile.originalname)
      )
    : optimizeImagefromUrl(imgUrl, folderPathes.optimized);

  // console.log("menuItem:  " + menuItem);
  console.log("requestformdata:  " + request.body.name);
  console.log({ ...menuItem });

  let dbIngredientsEntities = [];
  let dbIngredientsNames = [];
  let existIngrIds = [];
  let notExistIngrNames = [];
  const clientIngrlist = [...menuItem.selectedIngredients];
  let createdIngrds = [];
  let jointListIds = [];
  let newMenuItem = {};
  console.log(clientIngrlist);
  getAllIngredientsEntitiesFromDb()
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
    .then(() => {
      jointListIds = [...existIngrIds, ...getIds(createdIngrds)];
      newMenuItem = { ...menuItem, ingredients: jointListIds };
    })
    .then(() => {
      console.log("newMenuItem", newMenuItem),
        MENU_ITEM.create(newMenuItem, (err, createdItem) => {
          if (err) {
            // console.log(err);
            createdFailed(response, err.message);
            // throw new Error(err);
          } else {
            createdSuccess(response, createdItem);
          }
        });
    })
    .catch(err => createdFailed(response, err.message));
};
module.exports = () => [upload.single("imageFile"), createMenuItem];
