import { gql } from 'apollo-server-cloudflare';

export interface ActionReceiptInputData {
  data_id: string;
  receipt_id: string;
}

export interface GetActionReceiptInputDatas {
  since_data_id?: string;
  limit?: number;
}

export const ActionReceiptInputDataType = gql`
  type ActionReceiptInputData {
    data_id: ID!
    receipt_id: String!
  }
`;

export const NewActionReceiptInputDataType = gql`
  input NewActionReceiptInputData {
    data_id: ID!
    receipt_id: String!
  }
`;

export function getActionReceiptInputDataPrepare(
  env: Env
): D1PreparedStatement {
  return env.DB.prepare(
    `INSERT INTO action_receipt_input_datas (
      data_id,
      receipt_id
    ) VALUES (?1, ?2)`
  );
}

export function bindActionReceiptInputData(
  prepare: D1PreparedStatement,
  inputData: ActionReceiptInputData
): D1PreparedStatement {
  return prepare.bind(inputData.data_id, inputData.receipt_id);
}

export async function getActionReceiptInputData(
  env: Env,
  data_id: string
): Promise<ActionReceiptInputData> {
  const receipt = await env.DB.prepare(
    'SELECT * FROM action_receipt_input_datas WHERE data_id = ?1'
  )
    .bind(data_id)
    .first<ActionReceiptInputData>();
  return receipt;
}

export async function getActionReceiptInputDatas(
  env: Env,
  since_data_id?: string,
  limit = 100
): Promise<ActionReceiptInputData[]> {
  let rowid = 0;
  if (since_data_id != null) {
    try {
      rowid = (
        await env.DB.prepare(
          'SELECT rowid FROM action_receipt_input_datas WHERE data_id = ?1'
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
    'SELECT * FROM action_receipt_input_datas WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<ActionReceiptInputData>();
  return res.results ?? [];
}
