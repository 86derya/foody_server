module.exports = {
  userCreatedSuccess: function(response, user) {
    response.status(200);
    response.json({ status: "success", user: user });
  },
  userCreatedFail: function(response, reason = "User creation failed") {
    response.status(400);
    response.json({
      status: "failed",
      user: reason
    });
  },
  idSerchSuccess: function(response, foundId) {
    response.status(200);
    response.json({ status: "success", user: foundId });
  },
  idSearchFailed: function(response) {
    response.status(404);
    response.json({ status: "failed", user: "Not Found" });
  },
  userUpdateSuccess: function(response, user) {
    response.status(200);
    response.json({ status: "success", user: user });
  },
  userUpdateFailed: function(response, reason = "User updating failed") {
    response.status(400);
    response.json({ status: "failed", user: reason });
  },
  allusersFromDbSuccess: function(response, users) {
    response.status(200);
    response.json({ users: users });
  },
  allUsersFromDbFailed: function(response) {
    response.status(400);
    response.json({ status: "failed", users: [] });
  }
};
