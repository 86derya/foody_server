const User = require("../../modules/db/schemas/user");
const axios = require("axios");
const {
  authenticationFailed,
  authenticationSuccess
} = require("./configs/responses");

const cablogin = (request, response) => {
  const { login, password } = request.body;
  console.log("request.body :" + request.body);

  var settings = {
    async: true,
    crossDomain: true,
    url: "https://cab-ru.tramplin-uspeha.ru/api/v1/auth/login",
    method: "POST",
    headers: {
      "Cache-Control": "no-cache"
    },
    processData: false,
    data: { login: login, password: password }
  };
  // delete axios.defaults.headers.common['authorization'];
  // axios.defaults.headers.common.Authorization = null;

  return axios(settings).then(resp =>
    authenticationSuccess(response, resp.data)
  );

  // function onFind(err, user) {
  //   if (err) throw err;

  //   if (!user) return authenticationFailed(response, "Incorrect login");

  //   const isPasswordCorrect = checkPassword(password, user.password);

  //   const payload = {
  //     password,
  //     userid: user._id
  //   };

  //   isPasswordCorrect
  //     ? authenticationSuccess(response, user, generateToken(payload))
  //     : authenticationFailed(response, "Incorrect Password");
  // }
};

module.exports = cablogin;
