module.exports = {
  authenticationSuccess: function(response, user, token) {
    response.status(200);
    response.json({
      user: user,
      status: "success",
      message: "enjoy Your Token",
      token: token
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
  userCreatedSuccess: function(response, user) {
    response.status(200);
    response.json({ status: "success", user: user });
  },
  userCreatedFail: function(response, reason = "User creation failed") {
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
