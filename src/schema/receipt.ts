import { gql } from 'apollo-server-cloudflare';

export interface Receipt {
  receipt_id: string;
  block_hash: string;
  chunk_hash: string;
  chunk_index: number;
  timestamp: string;
  predecessor_id: string;
  receiver_id: string;
  receipt_kind: string;
  transaction_hash: string;
}

export interface GetReceipts {
  since_receipt_id?: string;
  limit?: number;
}

export const ReceiptType = gql`
  type Receipt {
    receipt_id: String!
    block_hash: String!
    chunk_hash: String!
    chunk_index: Int!
    timestamp: String!
    predecessor_id: String!
    receiver_id: String!
    receipt_kind: String!
    transaction_hash: String!
  }
`;

export const NewReceiptType = gql`
  input NewReceipt {
    receipt_id: String!
    block_hash: String!
    chunk_hash: String!
    chunk_index: Int!
    timestamp: String!
    predecessor_id: String!
    receiver_id: String!
    receipt_kind: String!
    transaction_hash: String!
  }
`;

export function getReceiptPrepare(env: Env): D1PreparedStatement {
  return env.DB.prepare(
    `INSERT INTO receipts (
      receipt_id,
      block_hash,
      chunk_hash,
      chunk_index,
      timestamp,
      predecessor_id,
      receiver_id,
      receipt_kind,
      transaction_hash
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
  );
}

export function bindReceipt(
  prepare: D1PreparedStatement,
  receipt: Receipt
): D1PreparedStatement {
  return prepare.bind(
    receipt.receipt_id,
    receipt.block_hash,
    receipt.chunk_hash,
    receipt.chunk_index,
    receipt.timestamp,
    receipt.predecessor_id,
    receipt.receiver_id,
    receipt.receipt_kind,
    receipt.transaction_hash
  );
}

export async function getReceipt(
  env: Env,
  receipt_id: string
): Promise<Receipt> {
  const receipt = await env.DB.prepare(
    'SELECT * FROM receipts WHERE receipt_id = ?1'
  )
    .bind(receipt_id)
    .first<Receipt>();
  return receipt;
}

export async function getReceipts(
  env: Env,
  since_receipt_id?: string,
  limit = 100
): Promise<Receipt[]> {
  let rowid = 0;
  if (since_receipt_id != null) {
    try {
      rowid = (
        await env.DB.prepare('SELECT rowid FROM receipts WHERE receipt_id = ?1')
          .bind(since_receipt_id)
          .first<{ rowid: number }>()
      ).rowid;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await env.DB.prepare(
    'SELECT * FROM receipts WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<Receipt>();
  return res.results ?? [];
}
