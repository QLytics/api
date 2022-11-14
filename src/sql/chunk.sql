DROP TABLE IF EXISTS chunks;
CREATE TABLE chunks (
  hash TEXT NOT NULL,
  block_hash TEXT NOT NULL,
  shard_id TEXT NOT NULL,
  signature TEXT NOT NULL,
  gas_limit TEXT NOT NULL,
  gas_used TEXT NOT NULL,
  author_account_id TEXT NOT NULL
);
CREATE UNIQUE INDEX chunk_hash ON chunks(hash);
