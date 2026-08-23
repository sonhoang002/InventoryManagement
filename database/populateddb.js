#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");
const { SQL } = require("./populateddb_local");

async function main() {
  const connectionString = process.argv[2] || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Provide DATABASE_URL or run: npm run db:seed -- <database-url>",
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
    console.log("Connecting to the deployed database...");
    await client.connect();
    await client.query(SQL);
    console.log("Deployed database seeded successfully.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Deployed database seed failed:", error);
  process.exit(1);
});
