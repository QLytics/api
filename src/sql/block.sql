DROP TABLE IF EXISTS blocks;
CREATE TABLE blocks (
  hash TEXT NOT NULL,
  height INTEGER NOT NULL,
  prev_hash TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  total_supply TEXT NOT NULL,
  gas_price TEXT NOT NULL,
  author_account_id TEXT NOT NULL
);
CREATE UNIQUE INDEX block_hash ON blocks(hash);
