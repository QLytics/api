import { gql } from 'apollo-server-cloudflare';

export interface TransactionAction {
  hash: string;
  transaction_index: number;
  action_kind: string;
  args: string;
}

export interface GetTransactionActions {
  since_hash?: string;
  limit?: number;
}

export const TransactionActionType = gql`
  type TransactionAction {
    hash: String!
    transaction_index: Int!
    action_kind: String!
    args: String!
  }
`;

export const NewTransactionActionType = gql`
  input NewTransactionAction {
    hash: String!
    transaction_index: Int!
    action_kind: String!
    args: String!
  }
`;

export function getTransactionActionPrepare(env: Env): D1PreparedStatement {
  return env.DB.prepare(
    `INSERT INTO transaction_actions (
      hash,
      transaction_index,
      action_kind,
      args
    ) VALUES (?1, ?2, ?3, ?4)`
  );
}

export function bindTransactionAction(
  prepare: D1PreparedStatement,
  transactionAction: TransactionAction
): D1PreparedStatement {
  return prepare.bind(
    transactionAction.hash,
    transactionAction.transaction_index,
    transactionAction.action_kind,
    transactionAction.args
  );
}

export async function getTransactionAction(
  env: Env,
  hash: string
): Promise<TransactionAction> {
  const transactionAction = await env.DB.prepare(
    'SELECT * FROM transaction_actions WHERE hash = ?1'
  )
    .bind(hash)
    .first<TransactionAction>();
  return transactionAction;
}

export async function getTransactionActions(
  env: Env,
  since_hash?: string,
  limit = 100
): Promise<TransactionAction[]> {
  let rowid = 0;
  if (since_hash != null) {
    try {
      rowid = (
        await env.DB.prepare(
          'SELECT rowid FROM transaction_actions WHERE hash = ?1'
        )
          .bind(since_hash)
          .first<{ rowid: number }>()
      ).rowid;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await env.DB.prepare(
    'SELECT * FROM transaction_actions WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<TransactionAction>();
  return res.results ?? [];
}
