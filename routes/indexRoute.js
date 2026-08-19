const express = require("express");
const usersController = require("../controller/usersController");
const indexRouter = express.Router();

indexRouter.get("/", usersController.getHomepage);

module.exports = indexRouter;
