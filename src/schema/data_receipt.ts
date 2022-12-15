import { gql } from 'apollo-server-cloudflare';
import { Kysely } from 'kysely';

import { DbSchema } from '../context/db-schema';

export interface DataReceipt {
  data_id: string;
  receipt_id: string;
  data?: number[];
}

export interface NewDataReceipt {
  data_id: string;
  receipt_id: string;
  data_base64?: string;
}

export interface GetDataReceipts {
  since_data_id?: string;
  limit?: number;
}

export const DataReceiptType = gql`
  type DataReceipt {
    data_id: String!
    receipt_id: String!
    data_base64: String
  }
`;

export const NewDataReceiptType = gql`
  input NewDataReceipt {
    data_id: String!
    receipt_id: String!
    data_base64: String
  }
`;

export async function getDataReceipt(
  db: Kysely<DbSchema>,
  data_id: string
): Promise<DataReceipt | undefined> {
  const dataReceipt = await db
    .selectFrom('data_receipts')
    .selectAll()
    .where('data_id', '=', data_id)
    .executeTakeFirst();
  return dataReceipt;
}

export async function getDataReceipts(
  db: Kysely<DbSchema>,
  since_data_id?: string,
  limit = 100
): Promise<DataReceipt[]> {
  let rowid = 0;
  if (since_data_id != null) {
    try {
      rowid =
        (
          await db
            .selectFrom('data_receipts')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .select('rowid' as any)
            .where('data_id', '=', since_data_id)
            .executeTakeFirst()
        )?.rowid ?? 0;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await db
    .selectFrom('data_receipts')
    .selectAll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .where('rowid' as any, '>', rowid)
    .limit(limit)
    .execute();
  return res;
}
