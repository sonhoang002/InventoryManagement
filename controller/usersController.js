const db = require("../database/pool");

exports.getHomepage = (req, res) => {
  res.render("index", { title: "Homepage" });
};

exports.getInventory = (req, res) => {
  const allMonsters = db.getAllMonster();
  console.log(allMonsters);
  res.send("respond with a resource");
};

exports.getNewMonsterForm = (req, res) => {
  res.render("addNewMonster", { title: "Add new monster" });
};

exports.postNewMonster = (req, res) => {
  console.log(req.body);
  res.redirect("/");
};
