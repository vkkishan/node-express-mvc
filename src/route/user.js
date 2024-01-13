const express = require("express");
const routes = express.Router();
const { userController } = require("../controller/index");
const { auth } = require("../middleware/auth");
// const au th = require("../middleware/auth");

routes.post("/register", userController.register);
routes.post("/login", userController.login);
routes.get("/allusers", auth(['user','admin']), userController.getAllUser);

module.exports = routes;
