import type { IExecutableSchemaDefinition } from '@graphql-tools/schema';

import { Context } from './context';
import { Block, Chunk, GetBlocks, GetChunks } from './schema';

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
    }
  },
  Mutation: {
    addBlocks: async (
      _: unknown,
      { blocks }: { blocks: Block[] },
      { dataSources }: Context
    ) => {
      return dataSources.database.addBlocks(blocks);
    },
    addChunks: async (
      _: unknown,
      { chunks }: { chunks: Chunk[] },
      { dataSources }: Context
    ) => {
      return dataSources.database.addChunks(chunks);
    }
  }
};
