const User = require("../../modules/db/schemas/user");
const { userUpdateSuccess, userUpdateFailed } = require("./configs/responses");

const updateUser = (request, response) => {
  const id = request.params.id;
  const propertyToUpdate = request.body;

  User.findOneAndUpdate({ _id: id }, propertyToUpdate, { new: true }, function(
    error,
    user
  ) {
    if (error) {
      userUpdateFailed(response, (reason = error.message));
    } else {
      userUpdateSuccess(response, user);
    }
  });
};

module.exports = updateUser;
