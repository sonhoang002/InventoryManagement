const db = require("../database/queries");

exports.getHomepage = (req, res) => {
  res.render("index", { title: "Homepage" });
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
  const {
    monster_id,
    monstername,
    level,
    type,
    element,
    description,
    regionname,
  } = await db.getMonster(req.params.id);

  res.render("detailMonsterInfo", {
    title: "Details",
    id: monster_id,
    monsterName: monstername,
    monsterLevel: level,
    monsterType: type,
    monsterEl: element,
    monsterDescription: description,
    monsterRegion: regionname,
  });
};

exports.getInventory = async (req, res) => {
  let allMonsters;

  if (Object.keys(req.query).length > 0) {
    allMonsters = await db.getAllSpecificMonsters(req.query);
  } else {
    allMonsters = await db.getAllMonsters();
  }

  res.render("inventory", {
    title: "Inventory",
    monsters: allMonsters,
  });
};

exports.getUpdateForm = async (req, res) => {
  const {
    monster_id,
    monstername,
    level,
    type,
    element,
    description,
    regionname,
  } = await db.getMonster(req.params.id);

  res.render("detailMonsterInfo", {
    title: "Update",
    id: monster_id,
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
