CREATE TABLE data_receipts (
  data_id TEXT NOT NULL PRIMARY KEY,
  receipt_id TEXT NOT NULL,
  -- REFERENCES receipts ON DELETE CASCADE,
  data BLOB
);

CREATE INDEX data_receipts_receipt_id_idx ON data_receipts (receipt_id);