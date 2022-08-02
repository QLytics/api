import { gql } from 'apollo-server-cloudflare';

import {
  ActionReceipt,
  ActionReceiptType,
  GetActionReceipts,
  NewActionReceiptType
} from './action_receipt';
import {
  ActionReceiptAction,
  ActionReceiptActionType,
  GetActionReceiptActions,
  NewActionReceiptActionType
} from './action_receipt_action';
import { Block, BlockType, GetBlocks, NewBlockType } from './block';
import { Chunk, ChunkType, GetChunks, NewChunkType } from './chunk';
import {
  DataReceipt,
  DataReceiptType,
  GetDataReceipts,
  NewDataReceiptType
} from './data_receipt';
import {
  ExecutionOutcome,
  ExecutionOutcomeType,
  GetExecutionOutcomes,
  NewExecutionOutcomeType
} from './execution_outcome';
import {
  ExecutionOutcomeReceipt,
  ExecutionOutcomeReceiptType,
  GetExecutionOutcomeReceipts,
  NewExecutionOutcomeReceiptType
} from './execution_outcome_receipt';
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
  ActionReceipt,
  ActionReceiptAction,
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
  GetActionReceipts,
  GetActionReceiptActions,
  Receipt,
  DataReceipt,
  ExecutionOutcome,
  GetExecutionOutcomes,
  ExecutionOutcomeReceipt,
  GetExecutionOutcomeReceipts
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

  ${ActionReceiptType}
  ${NewActionReceiptType}

  ${ActionReceiptActionType}
  ${NewActionReceiptActionType}

  ${ExecutionOutcomeType}
  ${NewExecutionOutcomeType}

  ${ExecutionOutcomeReceiptType}
  ${NewExecutionOutcomeReceiptType}

  input BlockData {
    block: NewBlock!
    chunks: [NewChunk!]!
    transactions: [NewTransaction!]!
    transaction_actions: [NewTransactionAction!]!
    receipts: [NewReceipt!]!
    data_receipts: [NewDataReceipt!]!
    action_receipts: [NewActionReceipt!]!
    execution_outcomes: [NewExecutionOutcome!]!
    execution_outcome_receipts: [NewExecutionOutcomeReceipt!]!
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
    actionReceipt(data_id: ID!): ActionReceipt
    actionReceipts(since_receipt_id: ID!, limit: Int = 100): [ActionReceipt]
    executionOutcome(receipt_id: ID!): ExecutionOutcome
    executionOutcomes(
      since_receipt_id: ID!
      limit: Int = 100
    ): [ExecutionOutcome]
    executionOutcomeReceipt(receipt_id: ID!): ExecutionOutcomeReceipt
    executionOutcomeReceipts(
      since_receipt_id: ID!
      limit: Int = 100
    ): [ExecutionOutcomeReceipt]
  }
`;
