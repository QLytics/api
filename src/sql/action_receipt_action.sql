DROP TABLE IF EXISTS action_receipt_actions;
CREATE TABLE action_receipt_actions (
  receipt_id TEXT NOT NULL,
  index_in_action_receipt INTEGER NOT NULL,
  action_kind TEXT NOT NULL,
  args TEXT NOT NULL,
  predecessor_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
CREATE UNIQUE INDEX action_receipt_action_receipt_id ON action_receipt_actions(receipt_id);
