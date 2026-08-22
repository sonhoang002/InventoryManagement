#! /usr/bin/env node
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS monsters (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  monstername TEXT NOT NULL,
  type TEXT NOT NULL,
  level INTEGER,
  element TEXT,
  description TEXT,
);

CREATE TABLE IF NOT EXISTS region (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  regionname TEXT,
);

CREATE TABLE IF NOT EXISTS region_assign (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  region_id INTEGER,
  monster_id INTEGER,
);

INSERT INTO monsters (monstername, type, level, element, description)
VALUES
  ('Slime', 'Beast', 1, 'None', 'SLime slime'),
  ('Drake', 'Fairy', 5, 'None', 'Draking');

INSERT INTO region (regionname)
VALUES
  ('Henesys'),
  ('Ellinia'),
  ('Perion'),
  ('Kerning City'),
  ('Sleepywood'),
  ('Lith Harbor'),
  ('Maple Island'),
  ('Forgotten Hollow'),
  ('Orbis'),
  ('El Nath');

INSERT INTO region_assign (region_id, monster_id)
VALUES
  (1, 1),
  (2, 2),
`;

async function main() {
  const connectionString = process.argv[2];

  if (!connectionString) {
    throw new Error(
      "Please provide a database URL: node database/populateddb.js <database-url>",
    );
  }

  const databaseUrl = new URL(connectionString);
  const localHosts = new Set(["localhost", "127.0.0.1", "::1"]);

  if (
    !localHosts.has(databaseUrl.hostname) &&
    !databaseUrl.searchParams.has("sslmode")
  ) {
    databaseUrl.searchParams.set("sslmode", "require");
  }

  const client = new Client({ connectionString: databaseUrl.toString() });

  try {
    console.log("Connecting to database...");
    await client.connect();

    console.log("Creating and populating messages table...");
    await client.query(SQL);

    console.log("Database populated successfully.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
