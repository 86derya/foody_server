const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = require("./modules/app");
const morgan = require("morgan");
const router = require("./router");
const path = require("path");
const fs = require("fs");
const config = require("../config");
const cors = require("cors");
const errorHandler = (request, response, next) => {
  response.status(500).send("No such page");
  next();
};
const checkAuth = (request, response, next) => {
  // check if user is logged it
  const userLoggedIn = checkUserAuth(req.headers);

  if (!userLoggedIn) {
    response.status(403).send("access forbidden");
    return;
  }

  next();
};

const staticPath = path.join(__dirname, "..", "assets");

const options = {
  key: fs.readFileSync(path.join(__dirname, "./ssl/server.key")),
  cert: fs.readFileSync(path.join(__dirname, "./ssl/server.crt"))
};

const startServer = port => {
  app
    // .options("*", cors())
    .use(cors())
    .set("superSecret", config.secret)
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan("dev"))
    // .use(checkAuth)
    .use(express.static(staticPath))
    .use("/", router)
    .disable("etag") //disables 304
    .use(errorHandler);

  http.createServer(app).listen(port);

  console.log("Server is running at http://localhost:" + port);
};

module.exports = startServer;
