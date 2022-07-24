import { gql } from 'apollo-server-cloudflare';

import { Block, BlockType, NewBlockType, GetBlocks } from './block';
import { Chunk, GetChunks, ChunkType, NewChunkType } from './chunk';
import {
  DataReceipt,
  DataReceiptType,
  GetDataReceipts,
  NewDataReceiptType
} from './data_receipt';
import { GetReceipts, NewReceiptType, Receipt, ReceiptType } from './receipt';
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
  GetTransactionActions,
  GetReceipts,
  GetDataReceipts,
  Receipt,
  DataReceipt
};

export interface BlockData {
  block: Block;
  chunks: Chunk[];
  transactions: Transaction[];
  transaction_actions: TransactionAction[];
  receipts: Receipt[];
  data_receipts: DataReceipt[];
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

  ${ReceiptType}
  ${NewReceiptType}

  ${DataReceiptType}
  ${NewDataReceiptType}

  input BlockData {
    block: NewBlock!
    chunks: [NewChunk!]!
    transactions: [NewTransaction!]!
    transaction_actions: [NewTransactionAction!]!
    receipts: [NewReceipt!]!
    data_receipts: [NewDataReceipt!]!
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
    receipt(receipt_id: ID!): Receipt
    receipts(since_receipt_id: ID!, limit: Int = 100): [Receipt]
    dataReceipt(data_id: ID!): DataReceipt
    dataReceipts(since_data_id: ID!, limit: Int = 100): [DataReceipt]
  }
`;
