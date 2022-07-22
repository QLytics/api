import type { IExecutableSchemaDefinition } from '@graphql-tools/schema';

import { Context } from './context';
import {
  Block,
  BlockData,
  Chunk,
  GetBlocks,
  GetChunks,
  GetTransactions,
  GetTransactionActions
} from './schema';

export const resolvers: IExecutableSchemaDefinition['resolvers'] = {
  Query: {
    block: async (_: unknown, { hash }: Block, { dataSources }: Context) => {
      return dataSources.database.getBlock(hash);
    },
    blocks: async (
      _: unknown,
      { since_hash, limit }: GetBlocks,
      { dataSources }: Context
    ) => {
      return dataSources.database.getBlocks(since_hash, limit);
    },
    chunk: async (_: unknown, { hash }: Chunk, { dataSources }: Context) => {
      return dataSources.database.getChunk(hash);
    },
    chunks: async (
      _: unknown,
      { since_hash, limit }: GetChunks,
      { dataSources }: Context
    ) => {
      return dataSources.database.getBlocks(since_hash, limit);
    },
    transaction: async (
      _: unknown,
      { hash }: Chunk,
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
      { hash }: Chunk,
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
    }
  },
  Mutation: {
    addBlockData: async (
      _: unknown,
      { block_data: blockData }: { block_data: BlockData[] },
      { dataSources }: Context
    ) => {
      return dataSources.database.addBlockData(blockData);
    }
  }
};
