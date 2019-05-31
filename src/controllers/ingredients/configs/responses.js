module.exports = {
  createdSuccess: function(response, ingredient) {
    response.status(200);
    response.json({ status: "success", ingredient: ingredient });
  },
  createdFailed: function(response, err) {
    response.status(404);
    response.json({ status: "failed", ingredient: err });
  },
  getSuccess: function(response, ingredients) {
    response.status(200);
    response.json({ status: "success", ingredients: ingredients });
  },
  getFailed: function(response, err) {
    response.status(404);
    response.json({ status: "failed", ingredients: err });
  }
};
