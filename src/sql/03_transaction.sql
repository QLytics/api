CREATE TABLE transactions (
  transaction_hash TEXT NOT NULL PRIMARY KEY,
  included_in_block_hash TEXT NOT NULL,
  included_in_chunk_hash TEXT NOT NULL,
  index_in_chunk TEXT NOT NULL,
  block_timestamp INTEGER NOT NULL,
  signer_account_id TEXT NOT NULL,
  signer_public_key TEXT NOT NULL,
  nonce INTEGER NOT NULL,
  receiver_account_id TEXT NOT NULL,
  signature TEXT NOT NULL,
  STATUS TEXT NOT NULL,
  converted_into_receipt_id TEXT NOT NULL,
  receipt_conversion_gas_burnt INTEGER NOT NULL,
  receipt_conversion_tokens_burnt TEXT NOT NULL
);

CREATE INDEX transactions_included_in_block_timestamp_idx ON transactions (block_timestamp);

CREATE INDEX transactions_signer_account_id_idx ON transactions (signer_account_id);

CREATE INDEX transactions_signer_public_key_idx ON transactions (signer_public_key);

CREATE INDEX transactions_included_in_block_hash_idx ON transactions (included_in_block_hash);

CREATE INDEX transactions_included_in_chunk_hash_idx ON transactions (included_in_chunk_hash);

CREATE INDEX transactions_converted_into_receipt_id_dx ON transactions (converted_into_receipt_id);

CREATE INDEX transactions_receiver_account_id_idx ON transactions (receiver_account_id);

CREATE INDEX transactions_sorting_idx ON transactions (block_timestamp, index_in_chunk);