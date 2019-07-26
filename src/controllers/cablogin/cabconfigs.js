const axios = require("axios");
const { configsSuccess, configsFail } = require("./configs/responses");

const cabconfigs = (request, response) => {
  const token = request.headers.authorization;
  const cleanToken = token.replace("Bearer ", "").trim();
  console.log(cleanToken);
  const configUrl = "https://cab-ru.tramplin-uspeha.ru/api/v1/cabinet/config";
  axios.defaults.headers.common.Authorization = `${token}`;
  axios
    .get(configUrl)
    .then(res => configsSuccess(response, res.data))
    .catch(err => configsFail(response, err.message));
};
// var settings = {
//   async: true,
//   crossDomain: true,
//   url: "https://cab-ru.tramplin-uspeha.ru/api/v1/auth/login",
//   method: "GET",
//   headers: {
//     "Cache-Control": "no-cache"
//   },
//   processData: false,
//   data: { login: login, password: password }
// };
// // delete axios.defaults.headers.common['authorization'];
// // axios.defaults.headers.common.Authorization = null;

// return axios(settings).then(resp =>
//   authenticationSuccess(response, resp.data)
// );

module.exports = cabconfigs;
