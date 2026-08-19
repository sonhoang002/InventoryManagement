const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "sh0101",
  password: process.env.LOCAL_DB_PASSWORD,
  database: "maple",
  port: 5432,
});
