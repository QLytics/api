import { gql } from 'apollo-server-cloudflare';

export interface ActionReceiptAction {
  receipt_id: string;
  index_in_action_receipt: number;
  action_kind: string;
  args: string;
  predecessor_id: string;
  receiver_id: string;
  timestamp: number;
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
    timestamp: Int!
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
    timestamp: Int!
  }
`;
