const Product = require("../../modules/db/schemas/product");

const {
  allProductsfromDbSuccess,
  allProductsfromDbFailed,
  ctgryQueryFailed,
  ctgryQuerySuccess,
  idsQuerySuccess,
  idsQueryFailed
} = require("./configs/responses");

const getProducts = (request, response) => {
  const {
    query: { category, ids }
  } = request;

  const getCleanQuery = query =>
    query.split(",").map(i => i.replace(/["\<>\s\ \\\'']/gm, ""));

  if (category || ids) {
    if (category) {
      const cleanCategoryQry = getCleanQuery(category);
      Product.find({ categories: { $in: cleanCategoryQry } }, function(
        err,
        products
      ) {
        if (err || products.length === 0) {
          ctgryQueryFailed(response);
        } else {
          ctgryQuerySuccess(response, products);
        }
      });
    }
    if (ids) {
      const cleanIdsQry = getCleanQuery(ids);
      Product.find({ _id: { $in: cleanIdsQry } }, function(err, products) {
        if (err) {
          idsQueryFailed(response);
        } else {
          idsQuerySuccess(response, products);
        }
      });
    }
  } else {
    Product.find({}, function(err, products) {
      if (err) {
        allProductsfromDbFailed(response);
      } else {
        allProductsfromDbSuccess(response, products);
      }
    });
  }
};
module.exports = getProducts;
