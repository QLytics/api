import { gql } from 'apollo-server-cloudflare';

import { Block, BlockType, NewBlockType, GetBlocks } from './block';

export { Block, GetBlocks };

export const typeDefs = gql`
  ${BlockType}

  ${NewBlockType}

  type Mutation {
    addBlocks(blocks: [NewBlock]!): [Block]
  }

  type Query {
    block(hash: ID!): Block
    blocks(since_hash: ID!, limit: Int = 100): [Block]
  }
`;
