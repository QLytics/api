import { gql } from 'apollo-server-cloudflare';

export interface AccountChange {
  id: string;
  account_id: string;
  timestamp: string;
  block_hash: string;
  transaction_hash: string;
  receipt_id: string;
  update_reason: string;
  nonstaked_balance: string;
  staked_balance: string;
  storage_usage: string;
  index_in_block: number;
}

export interface NewAccountChange {
  account_id: string;
  timestamp: string;
  block_hash: string;
  transaction_hash: string;
  receipt_id: string;
  update_reason: string;
  nonstaked_balance: string;
  staked_balance: string;
  storage_usage: string;
  index_in_block: number;
}

export interface GetAccountChanges {
  since_id?: string;
  limit?: number;
}

export const AccountChangeType = gql`
  type AccountChange {
    id: ID!
    account_id: String!
    timestamp: String!
    block_hash: String!
    transaction_hash: String
    receipt_id: String
    update_reason: String!
    nonstaked_balance: String!
    staked_balance: String!
    storage_usage: String!
    index_in_block: Int!
  }
`;

export const NewAccountChangeType = gql`
  input NewAccountChange {
    account_id: String!
    timestamp: String!
    block_hash: String!
    transaction_hash: String
    receipt_id: String
    update_reason: String!
    nonstaked_balance: String!
    staked_balance: String!
    storage_usage: String!
    index_in_block: Int!
  }
`;
