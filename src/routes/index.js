const express = require("express");
const router = express.Router();
const authHeader = require("../middleware/auth-header");
const check = require("../controller/checkLogin");

const userController = require("../controller/userController");
const bookmarkController = require("../controller/bookmarkController");
const mlController = require("../controller/mlcontroller");

let routes = (app) => {
  router.post("/auth/signUp", userController.signUp);
  router.post("/auth/signIn", userController.signIn);
  router.get("/checkToken", authHeader.auth, check.checkToken);
  router.get(
    "/bookmark",
    authHeader.auth,
    bookmarkController.getBookmarkByUserId
  );
  router.post(
    "/bookmark",
    authHeader.auth,
    bookmarkController.addBookmarkByWisataId
  );
  router.delete(
    "/bookmark",
    authHeader.auth,
    bookmarkController.deleteBookmarkByWisataId
  );
  router.post("/recommendcbf", mlController.getrecommendcbf);
  router.post("/recommendcbf2", mlController.getrecommendcbf2);
  app.use(router);
};

module.exports = routes;
