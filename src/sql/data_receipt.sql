DROP TABLE IF EXISTS data_receipts;
CREATE TABLE data_receipts (
  data_id TEXT NOT NULL,
  receipt_id TEXT NOT NULL,
  data_base64 TEXT NOT NULL
);
CREATE UNIQUE INDEX data_receipt_data_id ON data_receipts(data_id);
