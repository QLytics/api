import { gql } from 'apollo-server-cloudflare';

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
  env: Env,
  data_id: string
): Promise<DataReceipt> {
  const receipt = await env.DB.prepare(
    'SELECT * FROM data_receipts WHERE data_id = ?1'
  )
    .bind(data_id)
    .first<DataReceipt>();
  return receipt;
}

export async function getDataReceipts(
  env: Env,
  since_data_id?: string,
  limit = 100
): Promise<DataReceipt[]> {
  let rowid = 0;
  if (since_data_id != null) {
    try {
      rowid = (
        await env.DB.prepare(
          'SELECT rowid FROM data_receipts WHERE data_id = ?1'
        )
          .bind(since_data_id)
          .first<{ rowid: number }>()
      ).rowid;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await env.DB.prepare(
    'SELECT * FROM data_receipts WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<DataReceipt>();
  return res.results ?? [];
}
