module.exports = {
  allProductsfromDbSuccess: function(response, allProducts) {
    response.status(200);
    response.json({ products: allProducts });
  },
  allProductsfromDbFailed: function(response) {
    response.status(400);
    response.json({ status: "failed", products: [] });
  },
  ctgryQuerySuccess: function(response, filteredProducts) {
    response.status(200);
    response.json({ status: "success", products: filteredProducts });
  },
  ctgryQueryFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", products: [] });
  },
  idsQuerySuccess: function(response, filteredProducts) {
    response.status(200);
    response.json({ status: "success", products: filteredProducts });
  },
  idsQueryFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", products: [] });
  },
  idSerchSuccess: function(response, foundId) {
    response.status(200);
    response.json({ status: "success", products: foundId });
  },
  idSearchFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", products: [] });
  },
  createdSuccess: function(response, product) {
    response.status(200);
    response.json({ status: "success", product: product });
  },
  createdFailed: function(response, err) {
    response.status(404);
    response.json({ status: "failed", products: err });
  },
  productUpdateSuccess: function(response, product) {
    response.status(200);
    response.json({ status: "success", product: product });
  },
  productUpdateFailed: function(response, reason = "Product updating failed") {
    response.status(400);
    response.json({ status: "failed", product: reason });
  }
};
