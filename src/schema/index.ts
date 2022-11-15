import { gql } from 'apollo-server-cloudflare';

import {
  AccessKey,
  AccessKeyType,
  GetAccessKeys,
  NewAccessKeyType
} from './access_key';
import { Account, AccountType, GetAccounts, NewAccountType } from './account';
import {
  AccountChange,
  AccountChangeType,
  GetAccountChanges,
  NewAccountChange,
  NewAccountChangeType
} from './account_change';
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
import {
  ActionReceiptInputData,
  ActionReceiptInputDataType,
  GetActionReceiptInputDatas,
  NewActionReceiptInputDataType
} from './action_receipt_input_data';
import {
  ActionReceiptOutputData,
  ActionReceiptOutputDataType,
  GetActionReceiptOutputDatas,
  NewActionReceiptOutputDataType
} from './action_receipt_output_data';
import { Block, BlockType, NewBlockType } from './block';
import { Chunk, ChunkType, NewChunkType } from './chunk';
import {
  DataReceipt,
  DataReceiptType,
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
import { NewReceiptType, Receipt, ReceiptType } from './receipt';
import {
  NewTransactionType,
  Transaction,
  TransactionType
} from './transaction';
import {
  NewTransactionActionType,
  TransactionAction,
  TransactionActionType
} from './transaction_action';

export * from './block';
export * from './chunk';
export * from './data_receipt';
export * from './receipt';
export * from './transaction';
export * from './transaction_action';
export {
  AccessKey,
  Account,
  AccountChange,
  ActionReceipt,
  ActionReceiptAction,
  ActionReceiptInputData,
  ActionReceiptOutputData,
  GetAccessKeys,
  GetAccounts,
  GetAccountChanges,
  GetActionReceipts,
  GetActionReceiptActions,
  GetActionReceiptInputDatas,
  GetActionReceiptOutputDatas,
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
  action_receipts: ActionReceipt[];
  action_receipt_actions: ActionReceiptAction[];
  action_receipt_input_datas: ActionReceiptInputData[];
  action_receipt_output_datas: ActionReceiptOutputData[];
  execution_outcomes: ExecutionOutcome[];
  execution_outcome_receipts: ExecutionOutcomeReceipt[];
  accounts: Account[];
  account_changes: NewAccountChange[];
  access_keys: AccessKey[];
}

export interface GenesisBlockData {
  accounts: Account[];
  access_keys: AccessKey[];
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

  ${ActionReceiptInputDataType}
  ${NewActionReceiptInputDataType}

  ${ActionReceiptOutputDataType}
  ${NewActionReceiptOutputDataType}

  ${ExecutionOutcomeType}
  ${NewExecutionOutcomeType}

  ${ExecutionOutcomeReceiptType}
  ${NewExecutionOutcomeReceiptType}

  ${AccountType}
  ${NewAccountType}

  ${AccountChangeType}
  ${NewAccountChangeType}

  ${AccessKeyType}
  ${NewAccessKeyType}

  input BlockData {
    block: NewBlock!
    chunks: [NewChunk!]!
    transactions: [NewTransaction!]!
    transaction_actions: [NewTransactionAction!]!
    receipts: [NewReceipt!]!
    data_receipts: [NewDataReceipt!]!
    action_receipts: [NewActionReceipt!]!
    action_receipt_actions: [NewActionReceiptAction!]!
    action_receipt_input_datas: [NewActionReceiptInputData!]!
    action_receipt_output_datas: [NewActionReceiptOutputData!]!
    execution_outcomes: [NewExecutionOutcome!]!
    execution_outcome_receipts: [NewExecutionOutcomeReceipt!]!
    accounts: [NewAccount!]!
    account_changes: [NewAccountChange!]!
    access_keys: [NewAccessKey!]!
  }

  input GenesisBlockData {
    accounts: [NewAccount!]!
    access_keys: [NewAccessKey!]!
  }

  type Mutation {
    addBlockData(block_data: [BlockData!]!): Int
    addGenesisBlockData(block_data: [GenesisBlockData!]!): Int
    deleteAccounts(account_ids: [String!]!): Int
  }

  type Query {
    block(hash: ID!): Block
    blocks(since_hash: ID, limit: Int = 100): [Block]
    chunk(hash: ID!): Chunk
    chunks(since_hash: ID, limit: Int = 100): [Chunk]
    transaction(hash: ID!): Transaction
    transactions(since_hash: ID, limit: Int = 100): [Transaction]
    transactionAction(hash: ID!): TransactionAction
    transactionActions(since_hash: ID, limit: Int = 100): [TransactionAction]
    receipt(receipt_id: ID!): Receipt
    receipts(since_receipt_id: ID, limit: Int = 100): [Receipt]
    dataReceipt(data_id: ID!): DataReceipt
    dataReceipts(since_data_id: ID, limit: Int = 100): [DataReceipt]
    actionReceipt(receipt_id: ID!): ActionReceipt
    actionReceipts(since_receipt_id: ID, limit: Int = 100): [ActionReceipt]
    actionReceiptAction(receipt_id: ID!): ActionReceiptAction
    actionReceiptActions(
      since_receipt_id: ID
      limit: Int = 100
    ): [ActionReceiptAction]
    actionReceiptInputData(data_id: ID!): ActionReceiptInputData
    actionReceiptInputDatas(
      since_data_id: ID
      limit: Int = 100
    ): [ActionReceiptInputData]
    actionReceiptOutputData(data_id: ID!): ActionReceiptOutputData
    actionReceiptOutputDatas(
      since_data_id: ID
      limit: Int = 100
    ): [ActionReceiptOutputData]
    executionOutcome(receipt_id: ID!): ExecutionOutcome
    executionOutcomes(
      since_receipt_id: ID
      limit: Int = 100
    ): [ExecutionOutcome]
    executionOutcomeReceipt(receipt_id: ID!): ExecutionOutcomeReceipt
    executionOutcomeReceipts(
      since_receipt_id: ID
      limit: Int = 100
    ): [ExecutionOutcomeReceipt]
    account(account_id: ID!): Account
    accounts(since_account_id: ID, limit: Int = 100): [Account]
    accountChange(id: ID!): AccountChange
    accountChanges(since_id: ID, limit: Int = 100): [AccountChange]
    accessKey(public_key: ID!): AccessKey
    accessKeys(since_public_key: ID, limit: Int = 100): [AccessKey]
  }
`;
