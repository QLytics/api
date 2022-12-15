import { gql } from 'apollo-server-cloudflare';
import { Kysely } from 'kysely';

import { DbSchema } from '../context/db-schema';

export interface Transaction {
  transaction_hash: string;
  included_in_block_hash: string;
  included_in_chunk_hash: string;
  index_in_chunk: number;
  block_timestamp: string;
  signer_account_id: string;
  signer_public_key: string;
  nonce: string;
  receiver_account_id: string;
  signature: string;
  status: string;
  converted_into_receipt_id: string;
  receipt_conversion_gas_burnt: string;
  receipt_conversion_tokens_burnt: string;
}

export interface GetTransactions {
  since_transaction_hash?: string;
  limit?: number;
}

export const TransactionType = gql`
  type Transaction {
    transaction_hash: String!
    included_in_block_hash: String!
    included_in_chunk_hash: String!
    index_in_chunk: Int!
    block_timestamp: String!
    signer_account_id: String!
    signer_public_key: String!
    nonce: String!
    receiver_account_id: String!
    signature: String!
    status: String!
    converted_into_receipt_id: String!
    receipt_conversion_gas_burnt: String!
    receipt_conversion_tokens_burnt: String!
  }
`;

export const NewTransactionType = gql`
  input NewTransaction {
    transaction_hash: String!
    included_in_block_hash: String!
    included_in_chunk_hash: String!
    index_in_chunk: Int!
    block_timestamp: String!
    signer_account_id: String!
    signer_public_key: String!
    nonce: String!
    receiver_account_id: String!
    signature: String!
    status: String!
    converted_into_receipt_id: String!
    receipt_conversion_gas_burnt: String!
    receipt_conversion_tokens_burnt: String!
  }
`;

export async function getTransaction(
  db: Kysely<DbSchema>,
  hash: string
): Promise<Transaction | undefined> {
  const receipt = await db
    .selectFrom('transactions')
    .selectAll()
    .where('transaction_hash', '=', hash)
    .executeTakeFirst();
  return receipt;
}

export async function getTransactions(
  db: Kysely<DbSchema>,
  since_transaction_hash?: string,
  limit = 100
): Promise<Transaction[]> {
  let rowid = 0;
  if (since_transaction_hash != null) {
    try {
      rowid =
        (
          await db
            .selectFrom('transactions')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .select('rowid' as any)
            .where('transaction_hash', '=', since_transaction_hash)
            .executeTakeFirst()
        )?.rowid ?? 0;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await db
    .selectFrom('transactions')
    .selectAll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .where('rowid' as any, '>', rowid)
    .limit(limit)
    .execute();
  return res;
}
