import { gql } from 'apollo-server-cloudflare';

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
  since_hash?: string;
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
  env: Env,
  hash: string
): Promise<Transaction> {
  const transaction = await env.DB.prepare(
    'SELECT * FROM transactions WHERE transaction_hash = ?1'
  )
    .bind(hash)
    .first<Transaction>();
  return transaction;
}

export async function getTransactions(
  env: Env,
  since_hash?: string,
  limit = 100
): Promise<Transaction[]> {
  let rowid = 0;
  if (since_hash != null) {
    try {
      rowid = (
        await env.DB.prepare(
          'SELECT rowid FROM transactions WHERE transaction_hash = ?1'
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
    'SELECT * FROM transactions WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<Transaction>();
  return res.results ?? [];
}
