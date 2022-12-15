import { gql } from 'apollo-server-cloudflare';
import { Kysely } from 'kysely';

import { DbSchema } from '../context/db-schema';

export interface ActionReceipt {
  receipt_id: string;
  signer_account_id: string;
  signer_public_key: string;
  gas_price: string;
}

export interface GetActionReceipts {
  since_receipt_id?: string;
  limit?: number;
}

export const ActionReceiptType = gql`
  type ActionReceipt {
    receipt_id: String!
    signer_account_id: String!
    signer_public_key: String!
    gas_price: String!
  }
`;

export const NewActionReceiptType = gql`
  input NewActionReceipt {
    receipt_id: String!
    signer_account_id: String!
    signer_public_key: String!
    gas_price: String!
  }
`;

export async function getActionReceipt(
  db: Kysely<DbSchema>,
  receipt_id: string
): Promise<ActionReceipt | undefined> {
  const actionReceipt = await db
    .selectFrom('action_receipts')
    .selectAll()
    .where('receipt_id', '=', receipt_id)
    .executeTakeFirst();
  return actionReceipt;
}

export async function getActionReceipts(
  db: Kysely<DbSchema>,
  since_receipt_id?: string,
  limit = 100
): Promise<ActionReceipt[]> {
  let rowid = 0;
  if (since_receipt_id != null) {
    try {
      rowid =
        (
          await db
            .selectFrom('action_receipts')
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
    .selectFrom('action_receipts')
    .selectAll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .where('rowid' as any, '>', rowid)
    .limit(limit)
    .execute();
  return res;
}
