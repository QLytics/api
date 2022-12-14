CREATE TABLE transaction_actions (
  transaction_hash TEXT NOT NULL,
  -- REFERENCES transactions ON DELETE CASCADE,
  index_in_transaction INTEGER NOT NULL,
  action_kind TEXT NOT NULL,
  args TEXT NOT NULL,
  PRIMARY KEY (transaction_hash, index_in_transaction)
);

CREATE INDEX transactions_actions_action_kind_idx ON transaction_actions (action_kind);