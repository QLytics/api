import { gql } from 'apollo-server-cloudflare';

export interface ActionReceiptAction {
  receipt_id: string;
  index_in_action_receipt: number;
  action_kind: string;
  args: string;
  predecessor_id: string;
  receiver_id: string;
  timestamp: string;
}

export interface GetActionReceiptActions {
  since_receipt_id?: string;
  limit?: number;
}

export const ActionReceiptActionType = gql`
  type ActionReceiptAction {
    receipt_id: String!
    index_in_action_receipt: Int!
    action_kind: String!
    args: String!
    predecessor_id: String!
    receiver_id: String!
    timestamp: String!
  }
`;

export const NewActionReceiptActionType = gql`
  input NewActionReceiptAction {
    receipt_id: String!
    index_in_action_receipt: Int!
    action_kind: String!
    args: String!
    predecessor_id: String!
    receiver_id: String!
    timestamp: String!
  }
`;

export function getActionReceiptActionPrepare(env: Env): D1PreparedStatement {
  return env.DB.prepare(
    `INSERT INTO action_receipt_actions (
      receipt_id,
      index_in_action_receipt,
      action_kind,
      args,
      predecessor_id,
      receiver_id,
      timestamp
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
  );
}

export function bindActionReceiptAction(
  prepare: D1PreparedStatement,
  actionReceiptAction: ActionReceiptAction
): D1PreparedStatement {
  return prepare.bind(
    actionReceiptAction.receipt_id,
    actionReceiptAction.index_in_action_receipt,
    actionReceiptAction.action_kind,
    actionReceiptAction.args,
    actionReceiptAction.predecessor_id,
    actionReceiptAction.receiver_id,
    actionReceiptAction.timestamp
  );
}

export async function getActionReceiptAction(
  env: Env,
  receipt_id: string
): Promise<ActionReceiptAction> {
  const receipt = await env.DB.prepare(
    'SELECT * FROM action_receipt_actions WHERE receipt_id = ?1'
  )
    .bind(receipt_id)
    .first<ActionReceiptAction>();
  return receipt;
}

export async function getActionReceiptActions(
  env: Env,
  since_receipt_id?: string,
  limit = 100
): Promise<ActionReceiptAction[]> {
  let rowid = 0;
  if (since_receipt_id != null) {
    try {
      rowid = (
        await env.DB.prepare(
          'SELECT rowid FROM action_receipt_actions WHERE receipt_id = ?1'
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
    'SELECT * FROM action_receipt_actions WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<ActionReceiptAction>();
  return res.results ?? [];
}
