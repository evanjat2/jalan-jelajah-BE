const express = require("express");
const router = express.Router();

const authHeader = require("../middleware/auth-header");

const check = require("../controller/checkLogin");
const userController = require("../controller/userController");
const bookmarkController = require("../controller/bookmarkController");
const mlController = require("../controller/mlcontroller");
const imageController = require("../controller/imageController");

let routes = (app) => {
  // Check Token
  router.get("/checkToken", authHeader.auth, check.checkToken);

  // User
  router.post("/auth/signUp", userController.signUp);
  router.post("/auth/signIn", userController.signIn);
  router.patch("/profile", authHeader.auth, userController.updateProfil);
  router.post("/upload", authHeader.auth, imageController.upload);
  // Bookmark
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

  // Route ML
  router.post("/recommendcbf", mlController.getrecommendcbf);
  router.post("/recommendcbf2", mlController.getrecommendcbf2);

  app.use(router);
};

module.exports = routes;
