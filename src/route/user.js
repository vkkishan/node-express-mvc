const express = require("express");
const routes = express.Router();
const { userController } = require("../controller/index");
const { auth } = require("../middleware/auth");
const { userValidation } = require("../validation");
const { validator } = require("../middleware/validation");

routes.post(
  "/register/:name",
  validator(userValidation.register),
  userController.register
);
routes.post("/login", userController.login);
routes.get("/allusers", auth(["user", "admin"]), userController.getAllUser);

module.exports = routes;
