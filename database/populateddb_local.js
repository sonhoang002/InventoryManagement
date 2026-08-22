require("dotenv").config();

const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS region_assign;
DROP TABLE IF EXISTS region;
DROP TABLE IF EXISTS monsters;

CREATE TABLE IF NOT EXISTS monsters (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  monstername TEXT NOT NULL,
  type TEXT NOT NULL,
  level INTEGER,
  element TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS region (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  regionname TEXT
);

CREATE TABLE IF NOT EXISTS region_assign (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  region_id INTEGER REFERENCES region(id),
  monster_id INTEGER REFERENCES monsters(id)
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
  (2, 2);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: "localhost",
    user: "sh0101",
    password: process.env.LOCAL_DB_PASSWORD,
    database: "maple",
    port: 5432,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
