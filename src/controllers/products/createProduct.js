const Product = require("../../modules/db/schemas/product");

const { createdFailed, createdSuccess } = require("./configs/responses");

const createProduct = (request, response) => {
  const product = request.body;

  const newProduct = new Product(product);

  newProduct.save(function(err) {
    if (err) {
      console.log(err), createdFailed(response, err.message);
    } else {
      createdSuccess(response, newProduct);
    }
  });
};

module.exports = createProduct;
