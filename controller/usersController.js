const db = require("../database/queries");

exports.getHomepage = (req, res) => {
  res.render("index", { title: "Homepage" });
};

exports.getInventory = async (req, res) => {
  const matchingMonster = await db.getMatchingMonster();
  res.render("inventory", { title: "Inventory", monsters: matchingMonster });
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
  const { id, monstername, level, type, element, description, regionname } =
    await db.getMonster(req.params.id);

  res.render("detailMonsterInfo", {
    title: "Details",
    id: id,
    monsterName: monstername,
    monsterLevel: level,
    monsterType: type,
    monsterEl: element,
    monsterDescription: description,
    monsterRegion: regionname,
  });
};

exports.getUpdateForm = async (req, res) => {
  const { id, monstername, level, type, element, description, regionname } =
    await db.getMonster(req.params.id);
  res.render("detailMonsterInfo", {
    title: "Update",
    id: id,
    monsterName: monstername,
    monsterLevel: level,
    monsterType: type,
    monsterEl: element,
    monsterDescription: description,
    monsterRegion: regionname,
  });
};

exports.postUpdateForm = async (req, res) => {
  await db.postUpdatedMonster(req.body);
  res.redirect(`/inventory/${req.params.id}`);
};
