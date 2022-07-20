import { gql } from 'apollo-server-cloudflare';

import { Block, BlockType, NewBlockType, GetBlocks } from './block';
import { Chunk, GetChunks, ChunkType, NewChunkType } from './chunk';
import {
  NewTransactionType,
  Transaction,
  TransactionType
} from './transaction';

export { Block, Chunk, GetChunks, GetBlocks, Transaction };

export interface BlockData {
  block: Block;
  chunks: Chunk[];
}

export const typeDefs = gql`
  ${BlockType}
  ${NewBlockType}

  ${ChunkType}
  ${NewChunkType}

  ${TransactionType}
  ${NewTransactionType}

  input BlockData {
    block: NewBlock!
    chunks: [NewChunk!]!
    transactions: [NewTransaction!]!
  }

  type Mutation {
    addBlockData(block_data: [BlockData!]!): [Block]
  }

  type Query {
    block(hash: ID!): Block
    blocks(since_hash: ID!, limit: Int = 100): [Block]
    chunk(hash: ID!): Chunk
    chunks(since_hash: ID!, limit: Int = 100): [Chunk]
    transaction(hash: ID!): Transaction
    transactions(since_hash: ID!, limit: Int = 100): [Transaction]
  }
`;
