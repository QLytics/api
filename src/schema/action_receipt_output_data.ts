import { gql } from 'apollo-server-cloudflare';

export interface ActionReceiptOutputData {
  data_id: string;
  receipt_id: string;
  receiver_id: string;
}

export interface GetActionReceiptOutputDatas {
  since_data_id?: string;
  limit?: number;
}

export const ActionReceiptOutputDataType = gql`
  type ActionReceiptOutputData {
    data_id: ID!
    receipt_id: String!
    receiver_id: String!
  }
`;

export const NewActionReceiptOutputDataType = gql`
  input NewActionReceiptOutputData {
    data_id: ID!
    receipt_id: String!
    receiver_id: String!
  }
`;

export function getActionReceiptOutputDataPrepare(
  env: Env
): D1PreparedStatement {
  return env.DB.prepare(
    `INSERT INTO action_receipt_output_datas (
      data_id,
      receipt_id,
      receiver_id
    ) VALUES (?1, ?2, ?3)`
  );
}

export function bindActionReceiptOutputData(
  prepare: D1PreparedStatement,
  outputData: ActionReceiptOutputData
): D1PreparedStatement {
  return prepare.bind(
    outputData.data_id,
    outputData.receipt_id,
    outputData.receiver_id
  );
}

export async function getActionReceiptOutputData(
  env: Env,
  data_id: string
): Promise<ActionReceiptOutputData> {
  const receipt = await env.DB.prepare(
    'SELECT * FROM action_receipt_output_datas WHERE data_id = ?1'
  )
    .bind(data_id)
    .first<ActionReceiptOutputData>();
  return receipt;
}

export async function getActionReceiptOutputDatas(
  env: Env,
  since_data_id?: string,
  limit = 100
): Promise<ActionReceiptOutputData[]> {
  let rowid = 0;
  if (since_data_id != null) {
    try {
      rowid = (
        await env.DB.prepare(
          'SELECT rowid FROM action_receipt_output_datas WHERE data_id = ?1'
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
    'SELECT * FROM action_receipt_output_datas WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<ActionReceiptOutputData>();
  return res.results ?? [];
}
