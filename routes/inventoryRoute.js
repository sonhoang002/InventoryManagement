const express = require("express");
const usersController = require("../controller/usersController");
const inventoryRouter = express.Router();

/* GET users listing. */
inventoryRouter.get("/", usersController.getInventory);
inventoryRouter.get("/new", usersController.getNewMonsterForm);

inventoryRouter.post("/new", usersController.postNewMonster);

module.exports = inventoryRouter;
