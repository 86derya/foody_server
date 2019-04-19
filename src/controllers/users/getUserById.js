const User = require("../../modules/db/schemas/user");
const { idSerchSuccess, idSearchFailed } = require("./configs/responses");

const getUserById = (request, response) => {
  const id = request.params.id;

  const findUser = User.findById(id);

  findUser
    .then(user =>
      !user ? idSearchFailed(response) : idSerchSuccess(response, user)
    )
    .catch(err => {
      console.error("ERROR: ", err.message), idSearchFailed(response);
    });
};

module.exports = getUserById;
