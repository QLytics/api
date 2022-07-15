import { Block } from './type-defs';

export const resolvers = {
  Query: {
    block: async (_source: any, { hash }: Block, { dataSources }: any) => {
      console.log('hash', hash);
      return dataSources.database.getBlock(hash);
    }
  }
};
