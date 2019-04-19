const User = require("../../modules/db/schemas/user");

const {
  allusersFromDbSuccess,
  allusersFromDbFailed
} = require("./configs/responses");

const getUsers = (request, response) => {
  User.find({}, function(err, users) {
    if (err) {
      allusersFromDbFailed(response);
    } else {
      allusersFromDbSuccess(response, users);
    }
  });
};
module.exports = getUsers;
