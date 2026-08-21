const pool = require("./pool");

async function getAllMonsters() {
  const { rows } = await pool.query("SELECT * FROM monsters");
  return rows;
}

async function postNewMonster(monsterInfo) {
  const { monsterName, monsterLevel, monsterType, monsterEl } = monsterInfo;
  await pool.query(
    "INSERT INTO monsters (monstername, type, level, element) VALUES ($1, $2, $3, $4)",
    [monsterName, monsterType, monsterLevel, monsterEl],
  );
}

module.exports = {
  getAllMonsters,
  postNewMonster,
};
