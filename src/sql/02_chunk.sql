CREATE TABLE chunks (
  chunk_hash TEXT NOT NULL PRIMARY KEY,
  included_in_block_hash TEXT NOT NULL,
  -- REFERENCES blocks ON DELETE CASCADE,
  shard_id TEXT NOT NULL,
  signature TEXT NOT NULL,
  gas_limit TEXT NOT NULL,
  gas_used TEXT NOT NULL,
  author_account_id TEXT NOT NULL
);

CREATE INDEX chunks_included_in_block_hash_idx ON chunks (included_in_block_hash);