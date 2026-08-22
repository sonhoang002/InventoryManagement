const pool = require("./pool");

async function getAllMonsters() {
  const { rows } = await pool.query("SELECT * FROM monsters");
  return rows;
}

async function postNewMonster(monsterInfo) {
  const { monsterName, monsterLevel, monsterType, monsterEl, description } =
    monsterInfo;
  await pool.query(
    "INSERT INTO monsters (monstername, type, level, element, description) VALUES ($1, $2, $3, $4, $5)",
    [monsterName, monsterType, monsterLevel, monsterEl, description],
  );
}

async function getMonster(id) {
  const { rows } = await pool.query("SELECT * FROM monsters WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function postUpdatedMonster(updatedMonsterInfo) {
  const { id, monsterName, monsterLevel, monsterType, monsterEl, description } =
    updatedMonsterInfo;
  await pool.query(
    "UPDATE monsters SET monstername = $1, type = $2, level = $3, element = $4, description = $5 WHERE id = $6",
    [monsterName, monsterType, monsterLevel, monsterEl, description, id],
  );
}

module.exports = {
  getAllMonsters,
  postNewMonster,
  getMonster,
  postUpdatedMonster,
};
