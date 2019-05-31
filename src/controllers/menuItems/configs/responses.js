module.exports = {
  allMenuItemsfromDbSuccess: function(response, allMenuItems) {
    response.status(200);
    response.json({ menuItems: allMenuItems });
  },
  allMenuItemsfromDbFailed: function(response, reason) {
    response.status(400);
    response.json({ status: "failed", menuItems: reason });
  },
  ctgryQuerySuccess: function(response, filteredProducts) {
    response.status(200);
    response.json({ status: "success", menuItems: filteredProducts });
  },
  ctgryQueryFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", menuItems: [] });
  },
  idsQuerySuccess: function(response, filteredProducts) {
    response.status(200);
    response.json({ status: "success", menuItems: filteredProducts });
  },
  idsQueryFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", menuItems: [] });
  },
  idSerchSuccess: function(response, foundId) {
    response.status(200);
    response.json({ status: "success", menuItem: foundId });
  },
  idSearchFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", menuItem: [] });
  },
  createdSuccess: function(response, menuItem) {
    response.status(201);
    response.json({ status: "success", menuItem: menuItem });
  },
  createdFailed: function(response, err) {
    // response.status(400);
    response.json({ status: "failed", message: err });
  },
  productUpdateSuccess: function(response, menuItem) {
    response.status(200);
    response.json({ status: "success", menuItem: menuItem });
  },
  productUpdateFailed: function(response, reason = "Product updating failed") {
    response.status(400);
    response.json({ status: "failed", menuItem: reason });
  }
};
