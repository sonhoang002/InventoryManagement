const express = require("express");
const usersController = require("../controller/usersController");
const {
  requireEditorAccess,
  verifyEditorPasscode,
} = require("../middleware/passcodeAuth");
const inventoryRouter = express.Router();

/* GET users listing. */
inventoryRouter.get("/", usersController.getInventory);
inventoryRouter.post("/access", verifyEditorPasscode);
inventoryRouter.get(
  "/new",
  requireEditorAccess,
  usersController.getNewMonsterForm,
);
inventoryRouter.get("/:id", usersController.getMonster);
inventoryRouter.get(
  "/:id/update",
  requireEditorAccess,
  usersController.getUpdateForm,
);

inventoryRouter.post(
  "/:id/delete",
  requireEditorAccess,
  usersController.postNewDeleteRequest,
);
inventoryRouter.post(
  "/:id/update",
  requireEditorAccess,
  usersController.postUpdateForm,
);
inventoryRouter.post(
  "/new",
  requireEditorAccess,
  usersController.postNewMonster,
);

module.exports = inventoryRouter;
