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
    "INSERT INTO region (regionname) VALUES ($1) RETURNING id",
    [monsterRegion],
  );

  const monsterID = monsterResult.rows[0].id;
  const regionID = regionResult.rows[0].id;

  await pool.query(
    `INSERT INTO region_assign (region_id, monster_id)
   VALUES ($1, $2)`,
    [regionID, monsterID],
  );
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

async function getMonster(id) {
  const { rows } = await pool.query(
    `SELECT
      region.id AS region_id,
      region.regionname,
      monsters.id AS monster_id,
      monsters.monstername,
      monsters.type,
      monsters.level,
      monsters.element,
      monsters.description 
    FROM region
    JOIN region_assign
      ON region.id = region_assign.region_id
    JOIN monsters
      ON region_assign.monster_id = monsters.id
    WHERE monster_id = $1`,
    [id],
  );

  return rows[0];
}

async function getAllMonsters(req, res) {
  const { rows } = await pool.query(
    `SELECT 
      monsters.id AS monster_id,
      monsters.monstername,
      monsters.type,
      monsters.level,
      monsters.element,
      monsters.description,
      region.id AS region_id,
      region.regionname 
    FROM monsters JOIN region_assign ON monsters.id = region_assign.monster_id JOIN region ON region.id = region_assign.region_id`,
  );
  return rows;
}

async function getAllSpecificMonsters(req) {
  let { monsterType, monsterEl, monsterRegion } = req;

  monsterType = Array.isArray(monsterType)
    ? monsterType
    : monsterType
      ? [monsterType]
      : [];

  monsterEl = Array.isArray(monsterEl)
    ? monsterEl
    : monsterEl
      ? [monsterEl]
      : [];

  monsterRegion = Array.isArray(monsterRegion)
    ? monsterRegion
    : monsterRegion
      ? [monsterRegion]
      : [];

  const { rows } = await pool.query(
    `
    SELECT 
      *  
    FROM 
      monsters 
    JOIN 
      region_assign 
    ON 
      monsters.id = region_assign.monster_id 
    JOIN 
      region 
    ON 
      region.id = region_assign.region_id
    WHERE
      monsters.type = ANY($1)
    OR
      monsters.element = ANY($2)
    OR
      region.regionname = ANY($3)`,
    [monsterType, monsterEl, monsterRegion],
  );
  return rows;
}

async function deleteMonster(id) {
  await pool.query(
    `DELETE FROM region_assign
     WHERE monster_id = $1`,
    [id],
  );

  await pool.query(
    `DELETE FROM monsters
     WHERE id = $1`,
    [id],
  );
}

module.exports = {
  deleteMonster,
  postNewMonster,
  getMonster,
  postUpdatedMonster,
  getAllRegion,
  getAllMonsters,
  getAllSpecificMonsters,
};
