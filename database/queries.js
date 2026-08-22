const pool = require("./pool");

// OUTDATED
// async function getAllMonsters() {
//   const { rows } = await pool.query("SELECT * FROM monsters");
//   return rows;
// }

async function postNewMonster(monsterInfo) {
  const {
    monsterName,
    monsterLevel,
    monsterType,
    monsterEl,
    monsterRegion,
    description,
  } = monsterInfo;
  const monsterResult = await pool.query(
    "INSERT INTO monsters (monstername, type, level, element, description) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [monsterName, monsterType, monsterLevel, monsterEl, description],
  );
  const regionResult = await pool.query(
    "INSERT INTO region (regionname) VALUES ($1) RERTURNING id",
    [monsterRegion],
  );

  const monsterID = monsterResult.rows[0].id;
  const regionID = regionResult.rows[0].id;

  await pool.query(
    `INSERT INTO region_assign (region_id, monster_id)
   VALUES ($1, $2)`,
    [regionId, monsterId],
  );
}

async function getMonster(id) {
  const { rows } = await pool.query(
    "SELECT * FROM monsters JOIN region_assign ON monsters.id = region_assign.monster_id JOIN region ON region.id = region_assign.region_id WHERE monsters.id = $1",
    [id],
  );
  return rows[0];
}

async function postUpdatedMonster(updatedMonsterInfo) {
  const {
    id,
    monsterName,
    monsterLevel,
    monsterType,
    monsterEl,
    monsterRegion,
    description,
  } = updatedMonsterInfo;

  await pool.query(
    "UPDATE monsters SET monstername = $1, type = $2, level = $3, element = $4, description = $5 WHERE id = $6",
    [monsterName, monsterType, monsterLevel, monsterEl, description, id],
  );

  const regionResult = await pool.query(
    `SELECT id
     FROM region
     WHERE regionname = $1`,
    [monsterRegion],
  );

  const regionId = regionResult.rows[0].id;

  await pool.query(
    `UPDATE region_assign
     SET region_id = $1
     WHERE monster_id = $2`,
    [regionId, id],
  );
}

async function getAllRegion(req, res) {
  const { rows } = await pool.query("SELECT * FROM region");
  return rows;
}

async function getMatchingMonster(req, res) {
  const { rows } = await pool.query(
    "SELECT * FROM monsters JOIN region_assign ON monsters.id = region_assign.monster_id JOIN region ON region.id = region_assign.region_id",
  );
  console.log(rows);
  return rows;
}

module.exports = {
  postNewMonster,
  getMonster,
  postUpdatedMonster,
  getAllRegion,
  getMatchingMonster,
};
