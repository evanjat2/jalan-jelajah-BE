const express = require("express");
const router = express.Router();
const authHeader = require("../middleware/auth-header");
const check = require("../controller/checkLogin");
const userController = require("../controller/userController");
// const { verifyToken } = require('../middleware/verifyToken');
// const { refreshToken } = require('../controller/refreshToken');

let routes = (app) => {
  router.post("/auth/signUp", userController.signUp);
  router.post("/auth/signIn", userController.signIn);
  router.get("/",check.getResponse);
  app.use(router);
};

module.exports = routes;
