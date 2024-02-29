const express = require("express");
const router = express.Router();
const authHeader = require("../middleware/auth-header");
const check = require("../controller/checkLogin");

const userController = require("../controller/userController");
const bookmarkController = require("../controller/bookmarkController");

let routes = (app) => {
  router.post("/auth/signUp", userController.signUp);
  router.post("/auth/signIn", userController.signIn);
  router.get("/", check.getResponse);
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
  app.use(router);
};

module.exports = routes;
