import type { IExecutableSchemaDefinition } from '@graphql-tools/schema';

import { Context } from './context';
import { Block, GetBlocks } from './schema';

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
    }
  }
};
