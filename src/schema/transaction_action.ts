import { gql } from 'apollo-server-cloudflare';

export interface TransactionAction {
  hash: string;
  transaction_index: number;
  action_kind: string;
  args: string;
}

export interface GetTransactionActions {
  since_hash: string;
  limit?: number;
}

export const TransactionActionType = gql`
  type TransactionAction {
    hash: String!
    transaction_index: Int!
    action_kind: String!
    args: String!
  }
`;

export const NewTransactionActionType = gql`
  input NewTransactionAction {
    hash: String!
    transaction_index: Int!
    action_kind: String!
    args: String!
  }
`;
