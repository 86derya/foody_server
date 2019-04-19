const Product = require("../../modules/db/schemas/product");
const {
  productUpdateSuccess,
  productUpdateFailed
} = require("./configs/responses");

const updateProduct = (request, response) => {
  const id = request.params.id;
  const propertyToUpdate = request.body;

  Product.findOneAndUpdate(
    { _id: id },
    { $push: propertyToUpdate },
    { new: true },
    function(error, product) {
      if (error) {
        productUpdateFailed(response);
      } else {
        productUpdateSuccess(response, product);
      }
    }
  );
};

module.exports = updateProduct;
