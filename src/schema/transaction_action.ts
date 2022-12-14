import { gql } from 'apollo-server-cloudflare';

export interface TransactionAction {
  transaction_hash: string;
  index_in_transaction: number;
  action_kind: string;
  args: string;
}

export interface GetTransactionActions {
  since_hash?: string;
  limit?: number;
}

export const TransactionActionType = gql`
  type TransactionAction {
    transaction_hash: String!
    index_in_transaction: Int!
    action_kind: String!
    args: String!
  }
`;

export const NewTransactionActionType = gql`
  input NewTransactionAction {
    transaction_hash: String!
    index_in_transaction: Int!
    action_kind: String!
    args: String!
  }
`;

export async function getTransactionAction(
  env: Env,
  hash: string
): Promise<TransactionAction> {
  const transactionAction = await env.DB.prepare(
    'SELECT * FROM transaction_actions WHERE transaction_hash = ?1'
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
          'SELECT rowid FROM transaction_actions WHERE transaction_hash = ?1'
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
