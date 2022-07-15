import { gql } from 'apollo-server-cloudflare';

import { Block, BlockType, NewBlockType } from './block';

export { Block };

export const typeDefs = gql`
  ${BlockType}

  ${NewBlockType}

  type Mutation {
    addBlocks(blocks: [NewBlock!]!): [Block]
  }

  type Query {
    block(hash: ID!): Block
  }
`;
