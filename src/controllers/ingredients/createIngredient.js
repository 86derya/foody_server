const Ingredient = require("../../modules/db/schemas/ingredient");

const { createdFailed, createdSuccess } = require("./configs/responses");

const createIngredient = (request, response) => {
  const ingredient = request.body;

  const newIngredient = new Ingredient(ingredient);

  newIngredient.save(function(err) {
    if (err) {
      console.log(err), createdFailed(response, err.message);
    } else {
      createdSuccess(response, newIngredient);
    }
  });
};

module.exports = createIngredient;
