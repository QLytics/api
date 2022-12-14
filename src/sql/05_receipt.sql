CREATE TABLE receipts (
  receipt_id TEXT NOT NULL PRIMARY KEY,
  included_in_block_hash TEXT NOT NULL,
  -- REFERENCES blocks,
  included_in_chunk_hash TEXT NOT NULL,
  -- REFERENCES chunks,
  index_in_chunk INTEGER NOT NULL,
  included_in_block_timestamp TEXT NOT NULL,
  predecessor_account_id TEXT NOT NULL,
  receiver_account_id TEXT NOT NULL,
  receipt_kind TEXT NOT NULL,
  originated_from_transaction_hash TEXT NOT NULL -- REFERENCES transactions ON DELETE CASCADE
);

CREATE INDEX receipts_timestamp_idx ON receipts (included_in_block_timestamp);

CREATE INDEX receipts_included_in_block_hash_idx ON receipts (included_in_block_hash);

CREATE INDEX receipts_included_in_chunk_hash_idx ON receipts (included_in_chunk_hash);

CREATE INDEX receipts_predecessor_account_id_idx ON receipts (predecessor_account_id);

CREATE INDEX receipts_receiver_account_id_idx ON receipts (receiver_account_id);

CREATE INDEX receipts_originated_from_transaction_hash_idx ON receipts (originated_from_transaction_hash);