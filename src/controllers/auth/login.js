const User = require("../../modules/db/schemas/user");
const {
  authenticationFailed,
  authenticationSuccess
} = require("./configs/responses");
const { checkPassword, generateToken } = require("./helpers");

const login = (request, response) => {
  const { login, password } = request.body;
  console.log(request.body),
    User.findOne({ $or: [{ email: login }, { nickName: login }] }, onFind);

  function onFind(err, user) {
    if (err) throw err;

    if (!user) return authenticationFailed(response, "Incorrect login");

    const isPasswordCorrect = checkPassword(password, user.password);

    const payload = {
      password,
      userid: user._id
    };

    isPasswordCorrect
      ? authenticationSuccess(response, user, generateToken(payload))
      : authenticationFailed(response, "Incorrect Password");
  }
};

module.exports = login;
