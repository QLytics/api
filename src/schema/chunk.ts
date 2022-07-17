import { gql } from 'apollo-server-cloudflare';

export interface Chunk {
  hash: string;
  block_hash: string;
  shard_id: string;
  signature: string;
  gas_limit: string;
  gas_used: string;
  author_account_id: string;
}

export interface GetChunks {
  since_hash: string;
  limit?: number;
}

export const ChunkType = gql`
  type Chunk {
    hash: ID!
    block_hash: String!
    shard_id: String!
    signature: String!
    gas_limit: String!
    gas_used: String!
    author_account_id: String!
  }
`;

export const NewChunkType = gql`
  input NewChunk {
    hash: ID!
    block_hash: String!
    shard_id: String!
    signature: String!
    gas_limit: String!
    gas_used: String!
    author_account_id: String!
  }
`;
