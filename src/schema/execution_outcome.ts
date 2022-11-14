import { gql } from 'apollo-server-cloudflare';

export interface ExecutionOutcome {
  receipt_id: string;
  block_hash: string;
  chunk_index: number;
  timestamp: number;
  gas_burnt: string;
  tokens_burnt: string;
  account_id: string;
  status: string;
  shard: string;
}

export interface GetExecutionOutcomes {
  since_receipt_id?: string;
  limit?: number;
}

export const ExecutionOutcomeType = gql`
  type ExecutionOutcome {
    receipt_id: String!
    block_hash: String!
    chunk_index: Int!
    timestamp: Int!
    gas_burnt: String!
    tokens_burnt: String!
    account_id: String!
    status: String!
    shard: String!
  }
`;

export const NewExecutionOutcomeType = gql`
  input NewExecutionOutcome {
    receipt_id: String!
    block_hash: String!
    chunk_index: Int!
    timestamp: Int!
    gas_burnt: String!
    tokens_burnt: String!
    account_id: String!
    status: String!
    shard: String!
  }
`;
