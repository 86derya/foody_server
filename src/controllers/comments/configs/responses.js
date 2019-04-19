module.exports = {
  productQuerySuccess: function(response, comments) {
    response.status(200);
    response.json({ status: "success", comments: comments });
  },
  productQueryFailed: function(response) {
    response.status(200);
    response.json({ status: "success", comments: [] });
  },
  userQuerySuccess: function(response, comments) {
    response.status(200);
    response.json({ status: "success", comments: comments });
  },
  userQueryFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", comments: [] });
  },
  createdSuccess: function(response, comment) {
    response.status(200);
    response.json({ status: "success", comment: comment });
  },
  createdFailed: function(response, err) {
    response.status(404);
    response.json({ status: "failed", comment: err });
  }
};
