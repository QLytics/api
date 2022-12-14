import { gql } from 'apollo-server-cloudflare';

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
  env: Env,
  receipt_id: string
): Promise<ActionReceipt> {
  const receipt = await env.DB.prepare(
    'SELECT * FROM action_receipts WHERE receipt_id = ?1'
  )
    .bind(receipt_id)
    .first<ActionReceipt>();
  return receipt;
}

export async function getActionReceipts(
  env: Env,
  since_receipt_id?: string,
  limit = 100
): Promise<ActionReceipt[]> {
  let rowid = 0;
  if (since_receipt_id != null) {
    try {
      rowid = (
        await env.DB.prepare(
          'SELECT rowid FROM action_receipts WHERE receipt_id = ?1'
        )
          .bind(since_receipt_id)
          .first<{ rowid: number }>()
      ).rowid;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await env.DB.prepare(
    'SELECT * FROM action_receipts WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<ActionReceipt>();
  return res.results ?? [];
}
