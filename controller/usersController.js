const db = require("../database/queries");

exports.getHomepage = (req, res) => {
  res.render("index", { title: "Homepage" });
};

exports.getInventory = async (req, res) => {
  const allMonsters = await db.getAllMonsters();
  res.render("inventory", { title: "Inventory", monsters: allMonsters });
};

exports.getAboutPage = (req, res) => {
  res.render("about", { title: "About Page" });
};

exports.getNewMonsterForm = (req, res) => {
  res.render("addNewMonster", { title: "Add new monster" });
};

exports.postNewMonster = async (req, res) => {
  await db.postNewMonster(req.body);
  res.redirect("/");
};
