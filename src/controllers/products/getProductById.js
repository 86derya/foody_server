const Product = require("../../modules/db/schemas/product");
const { idSerchSuccess, idSearchFailed } = require("./configs/responses");

const getProductById = (request, response) => {
  const id = request.params.id;

  const findProduct = Product.findById(id);

  findProduct.populate("ingredients").exec((err, populatedProduct) => {
    if (err) {
      console.error("ERROR: ", err.message), idSearchFailed(response);
    } else {
      idSerchSuccess(response, populatedProduct);
    }
  });
};

module.exports = getProductById;
