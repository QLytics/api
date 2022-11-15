import { gql } from 'apollo-server-cloudflare';

export interface Transaction {
  hash: string;
  block_hash: string;
  chunk_hash: string;
  chunk_index: number;
  timestamp: string;
  signer_id: string;
  public_key: string;
  nonce: string;
  receiver_id: string;
  signature: string;
  status: string;
  receipt_id: string;
  gas_burnt: string;
  tokens_burnt: string;
}

export interface GetTransactions {
  since_hash?: string;
  limit?: number;
}

export const TransactionType = gql`
  type Transaction {
    hash: String!
    block_hash: String!
    chunk_hash: String!
    chunk_index: Int!
    timestamp: String!
    signer_id: String!
    public_key: String!
    nonce: String!
    receiver_id: String!
    signature: String!
    status: String!
    receipt_id: String!
    gas_burnt: String!
    tokens_burnt: String!
  }
`;

export const NewTransactionType = gql`
  input NewTransaction {
    hash: String!
    block_hash: String!
    chunk_hash: String!
    chunk_index: Int!
    timestamp: String!
    signer_id: String!
    public_key: String!
    nonce: String!
    receiver_id: String!
    signature: String!
    status: String!
    receipt_id: String!
    gas_burnt: String!
    tokens_burnt: String!
  }
`;

export function getTransactionPrepare(env: Env): D1PreparedStatement {
  return env.DB.prepare(
    `INSERT INTO transactions (
      hash,
      block_hash,
      chunk_hash,
      chunk_index,
      timestamp,
      signer_id,
      public_key,
      nonce,
      receiver_id,
      signature,
      status,
      receipt_id,
      gas_burnt,
      tokens_burnt
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)`
  );
}

export function bindTransaction(
  prepare: D1PreparedStatement,
  transaction: Transaction
): D1PreparedStatement {
  return prepare.bind(
    transaction.hash,
    transaction.block_hash,
    transaction.chunk_hash,
    transaction.chunk_index,
    transaction.timestamp,
    transaction.signer_id,
    transaction.public_key,
    transaction.nonce,
    transaction.receiver_id,
    transaction.signature,
    transaction.status,
    transaction.receipt_id,
    transaction.gas_burnt,
    transaction.tokens_burnt
  );
}

export async function getTransaction(
  env: Env,
  hash: string
): Promise<Transaction> {
  const transaction = await env.DB.prepare(
    'SELECT * FROM transactions WHERE hash = ?1'
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
        await env.DB.prepare('SELECT rowid FROM transactions WHERE hash = ?1')
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
