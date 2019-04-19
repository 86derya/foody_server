const jwt = require("jsonwebtoken");
const app = require("../../modules/app");

const logout = (request, response) => {
  const token = request.headers.authorization;
  const secretKey = app.get("superSecret");
  // const decoded = token.verify(t);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return response.json({
        success: false,
        message: "Failed to authenticate token."
      });
    } else {
      response.status(200).json({
        message: "Logout success"
      });
    }
  });
};

module.exports = logout;
