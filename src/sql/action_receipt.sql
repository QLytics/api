DROP TABLE IF EXISTS action_receipts;
CREATE TABLE action_receipts (
  receipt_id TEXT NOT NULL,
  signer_account_id TEXT NOT NULL,
  signer_public_key TEXT NOT NULL,
  gas_price TEXT NOT NULL
);
CREATE UNIQUE INDEX action_receipt_receipt_id ON action_receipts(receipt_id);
