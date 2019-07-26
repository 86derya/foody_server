module.exports = {
  authenticationSuccess: function(response, data) {
    response.status(200);
    response.json({
      data
    });
  },
  authenticationFailed: function(response, message = "Authentication Failed") {
    response.status(400);
    response.json({
      status: "failed",
      message: message,
      token: null
    });
  },
  configsSuccess: function(response, configs) {
    response.status(200);
    response.json({ status: "success", configs: configs });
  },
  configsFail: function(response, reason = "No access to configs") {
    // response.status(400);
    response.json({
      status: "failed",
      reason: reason
    });
  },
  idSerchSuccess: function(response, foundId) {
    response.status(200);
    response.json({ status: "success", user: foundId });
  },
  idSearchFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", user: "Not Found" });
  }
};
