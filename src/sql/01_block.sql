CREATE TABLE blocks (
  block_hash TEXT NOT NULL PRIMARY KEY,
  block_height INTEGER NOT NULL,
  prev_block_hash TEXT NOT NULL,
  block_timestamp INTEGER NOT NULL,
  total_supply TEXT NOT NULL,
  gas_price TEXT NOT NULL,
  author_account_id TEXT NOT NULL
);

CREATE INDEX blocks_height_idx ON blocks (block_height);

CREATE INDEX blocks_prev_hash_idx ON blocks (prev_block_hash);

CREATE INDEX blocks_timestamp_idx ON blocks (block_timestamp);