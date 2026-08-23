const { Pool } = require("pg");

module.exports = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  : new Pool({
      host: process.env.LOCAL_DB_HOST || "localhost",
      port: Number(process.env.LOCAL_DB_PORT) || 5432,
      user: process.env.LOCAL_DB_USER,
      password: process.env.LOCAL_DB_PASSWORD,
      database: process.env.LOCAL_DB_NAME || "maple",
    });
