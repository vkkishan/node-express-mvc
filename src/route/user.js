const express = require("express");
const routes = express.Router();
const { userController } = require("../controller/index");
const { auth } = require("../middleware/auth");
const { userValidation } = require("../validation");
const { validator } = require("../middleware/validation");
// const au th = require("../middleware/auth");

routes.post(
  "/register",
  validator(userValidation.register),
  userController.register
);
routes.post("/login", userController.login);
routes.get("/allusers", auth(["user", "admin"]), userController.getAllUser);

module.exports = routes;
