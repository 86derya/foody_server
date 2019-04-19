const dbUser = "derya";
const dbPassword = "%40e8srxwkp";

const config = {
  secret: "secret-301020",
  port: 80,
  dbUser,
  dbPassword,
  databaseUrl: `mongodb+srv://derya:${dbPassword}@cluster0-e2bim.mongodb.net/foody?retryWrites=true`
};

module.exports = config;
