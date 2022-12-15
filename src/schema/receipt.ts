import { gql } from 'apollo-server-cloudflare';
import { Kysely } from 'kysely';

import { DbSchema } from '../context/db-schema';

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
  db: Kysely<DbSchema>,
  receipt_id: string
): Promise<Receipt | undefined> {
  const receipt = await db
    .selectFrom('receipts')
    .selectAll()
    .where('receipt_id', '=', receipt_id)
    .executeTakeFirst();
  return receipt;
}

export async function getReceipts(
  db: Kysely<DbSchema>,
  since_receipt_id?: string,
  limit = 100
): Promise<Receipt[]> {
  let rowid = 0;
  if (since_receipt_id != null) {
    try {
      rowid =
        (
          await db
            .selectFrom('receipts')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .select('rowid' as any)
            .where('receipt_id', '=', since_receipt_id)
            .executeTakeFirst()
        )?.rowid ?? 0;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await db
    .selectFrom('receipts')
    .selectAll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .where('rowid' as any, '>', rowid)
    .limit(limit)
    .execute();
  return res;
}
