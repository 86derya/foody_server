const INGREDIENT = require("../../../modules/db/schemas/ingredient");

const getAllIngredientsEntitiesFromDb = () =>
  new Promise((res, rej) => {
    INGREDIENT.find({}, (err, ingrsEntities) => {
      if (err) {
        rej(err => {
          throw new Error(err);
        });
      } else {
        res(ingrsEntities);
      }
    });
  });

const createIngredient = async ingrName =>
  await new Promise((res, rej) => {
    INGREDIENT.create({ name: ingrName }, (err, createdEntity) => {
      if (err) {
        console.log(err);
        rej(err => {
          throw new Error(err);
        });
      } else {
        // ingredientsIds.push(resp._id);
        console.log("success", createdEntity);
        res(createdEntity);
      }
    });
  });

const getNames = entityArray => {
  return entityArray.map(i => i.name.toLowerCase().trim());
};

const getIds = entityArray => {
  return entityArray.map(i => i._id.toString());
};

const getNotExistIngredients = (dbListEntities, clientListNames) => {
  return clientListNames.filter(
    i => !getNames(dbListEntities).includes(i.toLowerCase().trim())
  );
};
const getExistIngredientsIds = (dbListEntities, clientListNames) => {
  return getIds(dbListEntities.filter(i => clientListNames.includes(i.name)));
};

module.exports = {
  getNames,
  getIds,
  getAllIngredientsEntitiesFromDb,
  createIngredient,
  getNotExistIngredients,
  getExistIngredientsIds
};
