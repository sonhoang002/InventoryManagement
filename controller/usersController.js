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
  res.redirect("/inventory");
};

exports.getMonster = async (req, res) => {
  const { id, monstername, level, type, element, description } =
    await db.getMonster(req.params.id);

  console.log(id, monstername, level, type, element, description);
  res.render("detailMonsterInfo", {
    title: "Details",
    id: id,
    monsterName: monstername,
    monsterLevel: level,
    monsterType: type,
    monsterEl: element,
    monsterDescription: description,
  });
};
