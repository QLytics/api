import type { IExecutableSchemaDefinition } from '@graphql-tools/schema';

import { Context } from './context';
import { Block } from './schema';

export const resolvers: IExecutableSchemaDefinition['resolvers'] = {
  Query: {
    block: async (_: unknown, { hash }: Block, { dataSources }: Context) => {
      return dataSources.database.getBlock(hash);
    }
  }
};
