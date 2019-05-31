const INGREDIENT = require("../../modules/db/schemas/ingredient");

const { getFailed, getSuccess } = require("./configs/responses");

const getAllIngredients = (request, response) => {
  INGREDIENT.find({}, function(err, ingredients) {
    if (err) {
      getFailed(response, err.message);
    } else {
      getSuccess(response, ingredients);
    }
  });
};

module.exports = getAllIngredients;
