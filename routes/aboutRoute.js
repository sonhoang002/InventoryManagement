const express = require("express");
const aboutRouter = express.Router();
const userController = require("../controller/usersController");

aboutRouter.get("/", userController.getAboutPage);

module.exports = aboutRouter;
