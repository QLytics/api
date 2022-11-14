import { gql } from 'apollo-server-cloudflare';

export interface Block {
  hash: string;
  height: number;
  prev_hash: string;
  timestamp: number;
  total_supply: string;
  gas_price: string;
  author_account_id: string;
}

export interface GetBlocks {
  since_hash?: string;
  limit?: number;
}

export const BlockType = gql`
  type Block {
    hash: ID!
    height: Int!
    prev_hash: String!
    timestamp: Int!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }
`;

export const NewBlockType = gql`
  input NewBlock {
    hash: ID!
    height: Int!
    prev_hash: String!
    timestamp: Int!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }
`;
