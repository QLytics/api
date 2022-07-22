import { gql } from 'apollo-server-cloudflare';

import { Block, BlockType, NewBlockType, GetBlocks } from './block';
import { Chunk, GetChunks, ChunkType, NewChunkType } from './chunk';
import {
  GetTransactions,
  NewTransactionType,
  Transaction,
  TransactionType
} from './transaction';
import {
  GetTransactionActions,
  NewTransactionActionType,
  TransactionAction,
  TransactionActionType
} from './transaction_action';

export {
  Block,
  Chunk,
  GetChunks,
  GetBlocks,
  Transaction,
  TransactionAction,
  GetTransactions,
  GetTransactionActions
};

export interface BlockData {
  block: Block;
  chunks: Chunk[];
  transactions: Transaction[];
  transactionActions: TransactionAction[];
}

export const typeDefs = gql`
  ${BlockType}
  ${NewBlockType}

  ${ChunkType}
  ${NewChunkType}

  ${TransactionType}
  ${NewTransactionType}

  ${TransactionActionType}
  ${NewTransactionActionType}

  input BlockData {
    block: NewBlock!
    chunks: [NewChunk!]!
    transactions: [NewTransaction!]!
    transactionActions: [NewTransactionAction!]!
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
    transactionAction(hash: ID!): TransactionAction
    transactionActions(since_hash: ID!, limit: Int = 100): [TransactionAction]
  }
`;
