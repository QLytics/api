DROP TABLE IF EXISTS transaction_actions;
CREATE TABLE transaction_actions (
  hash TEXT NOT NULL,
  transaction_index TEXT NOT NULL,
  action_kind TEXT NOT NULL,
  args TEXT NOT NULL
);
CREATE UNIQUE INDEX transaction_action_hash ON transaction_actions(hash);
