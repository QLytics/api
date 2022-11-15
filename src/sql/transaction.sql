DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  hash TEXT NOT NULL,
  block_hash TEXT NOT NULL,
  chunk_hash TEXT NOT NULL,
  chunk_index TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  signer_id TEXT NOT NULL,
  public_key TEXT NOT NULL,
  nonce TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  signature TEXT NOT NULL,
  status TEXT NOT NULL,
  receipt_id TEXT NOT NULL,
  gas_burnt TEXT NOT NULL,
  tokens_burnt TEXT NOT NULL
);
CREATE UNIQUE INDEX transaction_hash ON transactions(hash);
