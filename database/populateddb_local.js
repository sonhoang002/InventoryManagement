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
  ('Slime', 'Fairy', 7, 'Poison', 'A monster made of a squishy liquid, which uses its own viscosity to jump around everywhere.
The Slime''s inherent cuteness makes it a beloved monster amongst adventurers, which is why you''ll often come across all sorts of Slime paraphernalia, such as hats and earrings.
When you hunt Slimes, you''ll often end up with small pockets of liquid, which have a very pleasant apple scent. The scented liquid can be used in cooking as well! Sometimes, it will give the pompom on its head to adventurers.'),
  ('Pig', 'Beast', 7, 'None', 'Plain old pigs. You''ll find them on beaches, in pastures, and on pig farms, of course. They move fast and are great at ramming.
They''re also edible, which makes them one of my favorite monsters.
Have you ever eat pig head? There''s nothing better! They raise pigs on the Nautilus, though those oinkers are as rowdy as the pirates sometimes.
You know what they call a misbehaving pig? Dinner. Heh...'),
  ('Snail', 'Beast', 1, 'None', 'A small, weak creature native to Maple Island and Victoria Island. They used to be so common that there was a saying: "As common as snails." You don''t see them as much these days.
I''ve got an interesting snail tale. There was once an explorer who dreamed of becoming a star-throwing Thief, but her family was too poor to afford throwing stars. Left with no alternative, she started throwing snail shells instead. It turns out she had a knack for it. In the end, she became a famous adventurer.'),
  ('Muru', 'Beast', 1, 'Ice', 'A special monster that can only be seen in Rien. Covered in white fur, as if made out of snow. Looks as if direct sunlight could melt it away'),
  ('Octopus', 'Aquatic', 10, 'Dark', 'This octopus-like creature possesses almost alien features. The most daring of culinary artists use this bizarre animal to make mushroom meatballs. Some even brew it into medicinal tonics...
The tentacles do look chewy in an oddly tantalizing way, but something about it still feels deeply...icky.'),
  ('Floateye', 'Devil', 13, 'None', 'One-eye monster. No one knows where it coming from.'),
  ('Jr. Boogie', 'Fairy', 15, 'Fire', 'A small, round monster that appears in the South Rocky Mountain. Do not be fooled by its cute appearance -- it casts all kinds of debilitating status spells. It also has sticky fingers, and frequently steals people''s belongings.'),
  ('Charged Poison Golem', 'Machine', 46, 'Poison', 'The boss of poison forest.'),
  ('Zombie Mushroom', 'Undead', 65, 'Dark', 'A mushroom monster revived by attaching a Charm of the Undead to mushrooms that adventurers defeated prior.
Opinions vary on who revived these mushrooms and for what purpose. The most widely accepted theory is that it was the work of a magician researching dark magic.
Because it''s dead, and being held together with magic, it will collapse if the dark charm is removed.
However, due to its zombie nature, it continues to charge forward even when injured, making it difficult to deal unless one exploits that weakness.
Their nest can be found in the Ant Tunnel near Sleepywood.'),
  ('Drake', 'Reptile', 67, 'None', 'Many adventurers have fallen prey to this fearsome draconic beast. That said, it''s a creature of low intelligence, which arguably disqualifies it from being a proper dragon.
Individually, they can be outwitted, but a pack of them can swarm an adventurer, then drag them off straight to the dinner table.'),
  ('Jr. Balrog', 'Devil', 70, 'Dark', 'An ancient demon with massive wings and razor-sharp claws. Particularly bold and ''lucky'' adventurers sometimes spot it within the Cursed Temple of the Sleepywood Dungeon, at the center of Victoria Island.
Why, and by whom, such a dangerous creature was left in the depths of the temple remains a mystery. Its physical attacks are powerful enough, but the destructive force of its magic is beyond imagination.
In particular, the Balrog''s meteor magic, where it spreads its enormous wings and summons a flaming hailstorm from above, is nearly impossible to survive.'),
  ('Krip', 'Aquatic', 77, 'Fire', 'This shrimp hops around the eastern waters of Aqua Road with its arms crossed as if it''s angry at the world.
While it gets along well with other marine creatures, it''s... not so fond of warm-blooded land dwellers. I suppose that''s reasonable, considering how many land creatures have tried to eat them over the years...'),
  ('Zakum', 'Devil', 99, 'Dark', 'For countless years, the spirit of the Zakum Tree lay dormant and formless. But as it absorbed the energies of the lava region''s inhabitants, it slowly began to take shape.
The nearby settlement was brimming with dark energy born of the residents'' selfish desires. Amid the darkness, flames, and scorching heat, that dark energy fueled Zakum''s growth and twisted its spirit.
Zakum may have started as nothing more than a wretched tree, but the energy it absorbed over centuries gave it power that surpassed that of the humans. Eventually, it used that power to manipulate the inhabitants of the lava region into crafting stone statues it could inhabit, and Zakum rules over them to this very day.');

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
  ('El Nath'),
  ('Rien');

INSERT INTO region_assign (region_id, monster_id)
VALUES
  (2, 1),
  (1, 2),
  (1, 3),
  (11, 4),
  (4, 5),
  (8, 6),
  (3, 7),
  (5, 8),
  (5, 9),
  (5, 10),
  (5, 11),
  (11, 12),
  (10, 13);
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
