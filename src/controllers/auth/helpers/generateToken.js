const jwt = require("jsonwebtoken");
const app = require("../../../modules/app");

const generateToken = paramsForTokenGeneration => {
  const secretKey = app.get("superSecret");

  return jwt.sign(paramsForTokenGeneration, secretKey, {
    expiresIn: 60 * 60 * 72
  });
};
module.exports = generateToken;
