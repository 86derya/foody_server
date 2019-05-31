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

const { createdFailed, createdSuccess } = require("./configs/responses");

const createMenuItem = (request, response) => {
  const menuItem = request.body;
  console.log(menuItem);
  console.log(menuItem.ingredients);
  let dbIngredientsEntities = [];
  let dbIngredientsNames = [];
  let existIds = [];
  let notExistNames = [];
  const clientlist = [...menuItem.ingredients];
  let createdIngrds = [];
  let jointListIds = [];
  let newMenuItem = {};
  console.log(clientlist);
  getAllIngredientsEntitiesFromDb()
    .then(resp => {
      dbIngredientsEntities = resp;
      dbIngredientsNames = getNames(resp);
      notExistNames = getNotExistIngredients(resp, clientlist);
      existIds = getExistIngredientsIds(resp, clientlist);
    })
    .then(() => {
      return Promise.all(
        notExistNames.map(async i =>
          createdIngrds.push(await createIngredient(i))
        )
      );
    })
    .then(() => {
      jointListIds = [...existIds, ...getIds(createdIngrds)];
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

module.exports = createMenuItem;
