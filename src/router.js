const express = require("express");
const cors = require("cors");
const mainRoute = require("./controllers/main/main");
const { login, logout, signUp, getUserByToken } = require("./controllers/auth");
const verifyToken = require("./modules/verifyToken");

const {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  createComment
} = require("./controllers/menuItems");

const {
  createUser,
  getUserById,
  updateUser,
  getUsers
} = require("./controllers/users/");
const {
  createProduct,
  updateProduct,
  getProducts,
  getProductById
} = require("./controllers/products/");
const { createIngredient } = require("./controllers/ingredients/");

const { createOrder, getOrderById } = require("./controllers/orders");
const { getComments } = require("./controllers/comments");
const { getAllCategories } = require("./controllers/categories");

const apiRoutes = express.Router();

apiRoutes
  .post("/auth/login", login)
  .post("/auth/register", signUp)
  .post("/menu", createMenuItem)
  .get("/menu", getMenuItems)
  .get("/menu/:id", getMenuItemById)
  .get("/categories", getAllCategories)
  .put("/menu/:id/comments", createComment)
  .get("/", mainRoute)
  .get("/users", getUsers)
  .get("/users/:id", getUserById)
  .post("/users", createUser)
  .put("/users/:id", updateUser)
  .post("/products", createProduct)
  .get("/products", getProducts)
  .put("/products/:id", updateProduct)
  .get("/products/:id", getProductById)
  .post("/ingredients", createIngredient)
  .use(verifyToken)
  .post("/orders", createOrder)
  .get("/orders/:id", getOrderById)
  .post("/auth/current", getUserByToken)
  .post("/auth/logout", logout)
  // .post("/comments", createComment)
  .get("/comments", getComments);

module.exports = apiRoutes;
