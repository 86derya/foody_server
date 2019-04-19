module.exports = {
  getSuccess: function(response, categories) {
    response.status(200);
    response.json({ status: "success", categories: categories });
  },
  getFailed: function(response, err) {
    response.status(404);
    response.json({ status: "failed", categories: err });
  }
};
