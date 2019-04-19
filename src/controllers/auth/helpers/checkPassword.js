const bcrypt = require("bcrypt");
const checkPassword = (requestedPassword, hashedPasswordFromDb) =>
  bcrypt.compareSync(String(requestedPassword), String(hashedPasswordFromDb));
module.exports = checkPassword;
