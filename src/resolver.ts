import type { IExecutableSchemaDefinition } from '@graphql-tools/schema';
// import { BigIntResolver } from 'graphql-scalars';

import { Context } from './context';
import {
  AccessKey,
  Account,
  AccountChange,
  ActionReceipt,
  ActionReceiptAction,
  ActionReceiptInputData,
  ActionReceiptOutputData,
  Block,
  BlockData,
  Chunk,
  DataReceipt,
  ExecutionOutcome,
  ExecutionOutcomeReceipt,
  GenesisBlockData,
  GetAccessKeys,
  GetAccountChanges,
  GetAccounts,
  GetActionReceiptActions,
  GetActionReceiptInputDatas,
  GetActionReceiptOutputDatas,
  GetActionReceipts,
  GetBlocks,
  GetChunks,
  GetDataReceipts,
  GetExecutionOutcomeReceipts,
  GetExecutionOutcomes,
  GetReceipts,
  GetTransactionActions,
  GetTransactions,
  Receipt,
  Transaction,
  TransactionAction
} from './schema';

export const resolvers: IExecutableSchemaDefinition['resolvers'] = {
  // BigInt: BigIntResolver,

  Query: {
    block: async (
      _: unknown,
      { block_hash: hash }: Block,
      { dataSources }: Context
    ) => {
      return dataSources.database.getBlock(hash);
    },
    blocks: async (
      _: unknown,
      { since_hash, limit }: GetBlocks,
      { dataSources }: Context
    ) => {
      return dataSources.database.getBlocks(since_hash, limit);
    },
    chunk: async (
      _: unknown,
      { chunk_hash: hash }: Chunk,
      { dataSources }: Context
    ) => {
      return dataSources.database.getChunk(hash);
    },
    chunks: async (
      _: unknown,
      { since_hash, limit }: GetChunks,
      { dataSources }: Context
    ) => {
      return dataSources.database.getChunks(since_hash, limit);
    },
    transaction: async (
      _: unknown,
      { transaction_hash: hash }: Transaction,
      { dataSources }: Context
    ) => {
      return dataSources.database.getTransaction(hash);
    },
    transactions: async (
      _: unknown,
      { since_hash, limit }: GetTransactions,
      { dataSources }: Context
    ) => {
      return dataSources.database.getTransactions(since_hash, limit);
    },
    transactionAction: async (
      _: unknown,
      { transaction_hash: hash }: TransactionAction,
      { dataSources }: Context
    ) => {
      return dataSources.database.getTransactionAction(hash);
    },
    transactionActions: async (
      _: unknown,
      { since_hash, limit }: GetTransactionActions,
      { dataSources }: Context
    ) => {
      return dataSources.database.getTransactionActions(since_hash, limit);
    },
    receipt: async (
      _: unknown,
      { receipt_id }: Receipt,
      { dataSources }: Context
    ) => {
      return dataSources.database.getReceipt(receipt_id);
    },
    receipts: async (
      _: unknown,
      { since_receipt_id, limit }: GetReceipts,
      { dataSources }: Context
    ) => {
      return dataSources.database.getReceipts(since_receipt_id, limit);
    },
    dataReceipt: async (
      _: unknown,
      { data_id }: DataReceipt,
      { dataSources }: Context
    ) => {
      return dataSources.database.getDataReceipt(data_id);
    },
    dataReceipts: async (
      _: unknown,
      { since_data_id, limit }: GetDataReceipts,
      { dataSources }: Context
    ) => {
      return dataSources.database.getDataReceipts(since_data_id, limit);
    },
    actionReceipt: async (
      _: unknown,
      { receipt_id }: ActionReceipt,
      { dataSources }: Context
    ) => {
      return dataSources.database.getActionReceipt(receipt_id);
    },
    actionReceipts: async (
      _: unknown,
      { since_receipt_id, limit }: GetActionReceipts,
      { dataSources }: Context
    ) => {
      return dataSources.database.getActionReceipts(since_receipt_id, limit);
    },
    actionReceiptAction: async (
      _: unknown,
      { receipt_id }: ActionReceiptAction,
      { dataSources }: Context
    ) => {
      return dataSources.database.getActionReceiptAction(receipt_id);
    },
    actionReceiptActions: async (
      _: unknown,
      { since_receipt_id, limit }: GetActionReceiptActions,
      { dataSources }: Context
    ) => {
      return dataSources.database.getActionReceiptActions(
        since_receipt_id,
        limit
      );
    },
    actionReceiptInputData: async (
      _: unknown,
      { data_id }: ActionReceiptInputData,
      { dataSources }: Context
    ) => {
      return dataSources.database.getActionReceiptInputData(data_id);
    },
    actionReceiptInputDatas: async (
      _: unknown,
      { since_data_id, limit }: GetActionReceiptInputDatas,
      { dataSources }: Context
    ) => {
      return dataSources.database.getActionReceiptInputDatas(
        since_data_id,
        limit
      );
    },
    actionReceiptOutputData: async (
      _: unknown,
      { data_id }: ActionReceiptOutputData,
      { dataSources }: Context
    ) => {
      return dataSources.database.getActionReceiptOutputData(data_id);
    },
    actionReceiptOutputDatas: async (
      _: unknown,
      { since_data_id, limit }: GetActionReceiptOutputDatas,
      { dataSources }: Context
    ) => {
      return dataSources.database.getActionReceiptOutputDatas(
        since_data_id,
        limit
      );
    },
    executionOutcome: async (
      _: unknown,
      { receipt_id }: ExecutionOutcome,
      { dataSources }: Context
    ) => {
      return dataSources.database.getExecutionOutcome(receipt_id);
    },
    executionOutcomes: async (
      _: unknown,
      { since_receipt_id, limit }: GetExecutionOutcomes,
      { dataSources }: Context
    ) => {
      return dataSources.database.getExecutionOutcomes(since_receipt_id, limit);
    },
    executionOutcomeReceipt: async (
      _: unknown,
      { receipt_id }: ExecutionOutcomeReceipt,
      { dataSources }: Context
    ) => {
      return dataSources.database.getExecutionOutcomeReceipt(receipt_id);
    },
    executionOutcomeReceipts: async (
      _: unknown,
      { since_receipt_id, limit }: GetExecutionOutcomeReceipts,
      { dataSources }: Context
    ) => {
      return dataSources.database.getExecutionOutcomeReceipts(
        since_receipt_id,
        limit
      );
    },
    account: async (
      _: unknown,
      { account_id }: Account,
      { dataSources }: Context
    ) => {
      return dataSources.database.getAccount(account_id);
    },
    accounts: async (
      _: unknown,
      { since_account_id, limit }: GetAccounts,
      { dataSources }: Context
    ) => {
      return dataSources.database.getAccounts(since_account_id, limit);
    },
    accountChange: async (
      _: unknown,
      { id }: AccountChange,
      { dataSources }: Context
    ) => {
      return dataSources.database.getAccountChange(id);
    },
    accountChanges: async (
      _: unknown,
      { since_id, limit }: GetAccountChanges,
      { dataSources }: Context
    ) => {
      return dataSources.database.getAccountChanges(since_id, limit);
    },
    accessKey: async (
      _: unknown,
      { public_key }: AccessKey,
      { dataSources }: Context
    ) => {
      return dataSources.database.getAccessKey(public_key);
    },
    accessKeys: async (
      _: unknown,
      { since_public_key, limit }: GetAccessKeys,
      { dataSources }: Context
    ) => {
      return dataSources.database.getAccessKeys(since_public_key, limit);
    }
  },

  Mutation: {
    addBlockData: async (
      _: unknown,
      { block_data: blockData }: { block_data: BlockData[] },
      { dataSources }: Context
    ) => {
      return dataSources.database.addBlockData(blockData);
    },
    addGenesisBlockData: async (
      _: unknown,
      { block_data: blockData }: { block_data: GenesisBlockData[] },
      { dataSources }: Context
    ) => {
      return dataSources.database.addGenesisBlockData(blockData);
    },
    deleteAccounts: async (
      _: unknown,
      { account_ids: accountIds }: { account_ids: string[] },
      { dataSources }: Context
    ) => {
      return dataSources.database.deleteAccounts(accountIds);
    }
  }
};
