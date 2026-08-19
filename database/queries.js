const pool = require("./pool");

async function getAllMonsters() {
  const { rows } = await pool.query("SELECT * FROM monster");
  return rows;
}

module.exports = { getAllMonsters };
