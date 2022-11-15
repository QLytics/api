DROP TABLE IF EXISTS transactions;
CREATE TABLE receipts (
  receipt_id TEXT NOT NULL,
  block_hash TEXT NOT NULL,
  chunk_hash TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  predecessor_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  receipt_kind TEXT NOT NULL,
  transaction_hash TEXT NOT NULL
);
CREATE UNIQUE INDEX receipt_receipt_id ON receipts(receipt_id);
