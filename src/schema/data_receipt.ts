import { gql } from 'apollo-server-cloudflare';

export interface DataReceipt {
  data_id: string;
  receipt_id: string;
  data_base64: string;
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

export function getDataReceiptPrepare(env: Env): D1PreparedStatement {
  return env.DB.prepare(
    `INSERT INTO data_receipts (
      data_id TEXT NOT NULL,
      receipt_id TEXT NOT NULL,
      data_base64 TEXT NOT NULL
    ) VALUES (?1, ?2, ?3)`
  );
}

export function bindDataReceipt(
  prepare: D1PreparedStatement,
  dataReceipt: DataReceipt
): D1PreparedStatement {
  return prepare.bind(
    dataReceipt.data_id,
    dataReceipt.receipt_id,
    dataReceipt.data_base64
  );
}

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
