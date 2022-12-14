import { gql } from 'apollo-server-cloudflare';

export interface Receipt {
  receipt_id: string;
  included_in_block_hash: string;
  included_in_chunk_hash: string;
  index_in_chunk: number;
  included_in_block_timestamp: string;
  predecessor_account_id: string;
  receiver_account_id: string;
  receipt_kind: string;
  originated_from_transaction_hash: string;
}

export interface GetReceipts {
  since_receipt_id?: string;
  limit?: number;
}

export const ReceiptType = gql`
  type Receipt {
    receipt_id: String!
    included_in_block_hash: String!
    included_in_chunk_hash: String!
    index_in_chunk: Int!
    included_in_block_timestamp: String!
    predecessor_account_id: String!
    receiver_account_id: String!
    receipt_kind: String!
    originated_from_transaction_hash: String!
  }
`;

export const NewReceiptType = gql`
  input NewReceipt {
    receipt_id: String!
    included_in_block_hash: String!
    included_in_chunk_hash: String!
    index_in_chunk: Int!
    included_in_block_timestamp: String!
    predecessor_account_id: String!
    receiver_account_id: String!
    receipt_kind: String!
    originated_from_transaction_hash: String!
  }
`;

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
