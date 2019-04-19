const CATEGORY = require("../../modules/db/schemas/category");

const { getFailed, getSuccess } = require("./configs/responses");

const getAllCategories = (request, response) => {
  CATEGORY.find({}, function(err, categories) {
    if (err) {
      getFailed(response, err.message);
    } else {
      getSuccess(response, categories);
    }
  });
};

module.exports = getAllCategories;
