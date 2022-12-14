CREATE TABLE action_receipts (
  receipt_id TEXT NOT NULL PRIMARY KEY,
  -- REFERENCES receipts ON DELETE CASCADE,
  signer_account_id TEXT NOT NULL,
  signer_public_key TEXT NOT NULL,
  gas_price TEXT NOT NULL
);

CREATE INDEX action_receipt_signer_account_id_idx ON action_receipts (signer_account_id);