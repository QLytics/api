DROP TABLE IF EXISTS action_receipt_output_datas;
CREATE TABLE action_receipt_output_datas (
  data_id TEXT NOT NULL,
  receipt_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL
);
CREATE UNIQUE INDEX action_receipt_output_data_data_id ON action_receipt_output_datas(data_id);
