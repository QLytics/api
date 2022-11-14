DROP TABLE IF EXISTS blocks;
CREATE TABLE blocks (
  hash TEXT,
  height INTEGER,
  prev_hash TEXT,
  timestamp INTEGER,
  total_supply TEXT,
  gas_price TEXT,
  author_account_id TEXT
);
CREATE UNIQUE INDEX hash ON blocks(hash);
