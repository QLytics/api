import { gql } from 'apollo-server-cloudflare';
import { Kysely } from 'kysely';

import { DbSchema } from '../context/db-schema';

export interface TransactionAction {
  transaction_hash: string;
  index_in_transaction: number;
  action_kind: string;
  args: string;
}

export interface TransactionActionPk {
  transaction_hash: string;
  index_in_transaction: number;
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

export const TransactionActionPk = gql`
  input TransactionActionPk {
    transaction_hash: String!
    index_in_transaction: Int!
  }
`;

export async function getTransactionAction(
  db: Kysely<DbSchema>,
  transaction_hash: string,
  index_in_transaction: number
): Promise<TransactionAction | undefined> {
  const receipt = await db
    .selectFrom('transaction_actions')
    .selectAll()
    .where('transaction_hash', '=', transaction_hash)
    .where('index_in_transaction', '=', index_in_transaction)
    .executeTakeFirst();
  return receipt;
}

export async function getTransactionActions(
  db: Kysely<DbSchema>,
  since_hash?: string,
  limit = 100
): Promise<TransactionAction[]> {
  let rowid = 0;
  if (since_hash != null) {
    try {
      rowid =
        (
          await db
            .selectFrom('transaction_actions')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .select('rowid' as any)
            .where('transaction_hash', '=', since_hash)
            .executeTakeFirst()
        )?.rowid ?? 0;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await db
    .selectFrom('transaction_actions')
    .selectAll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .where('rowid' as any, '>', rowid)
    .limit(limit)
    .execute();
  return res;
}
