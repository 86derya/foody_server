const User = require("../../modules/db/schemas/user");
const bcrypt = require("bcrypt");

const { userCreatedFail, userCreatedSuccess } = require("./configs/responses");

const createUser = (request, response) => {
  const user = request.body;
  console.log(user);
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const userData = { ...user, password: hashedPassword };

  const newUser = new User(userData);

  newUser.save(function(err) {
    if (err) {
      userCreatedFail(response, (reason = err.message));
    } else {
      userCreatedSuccess(response, newUser);
    }
  });
};

module.exports = createUser;
