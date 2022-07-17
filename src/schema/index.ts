import { gql } from 'apollo-server-cloudflare';

import { Block, BlockType, NewBlockType, GetBlocks } from './block';
import { Chunk, GetChunks, ChunkType, NewChunkType } from './chunk';

export { Block, Chunk, GetChunks, GetBlocks };

export const typeDefs = gql`
  ${BlockType}
  ${NewBlockType}

  ${ChunkType}
  ${NewChunkType}

  type Mutation {
    addBlocks(blocks: [NewBlock!]!): [Block]
    addChunks(chunks: [NewChunk!]!): [Chunk]
  }

  type Query {
    block(hash: ID!): Block
    blocks(since_hash: ID!, limit: Int = 100): [Block]
    chunk(hash: ID!): Chunk
    chunks(since_hash: ID!, limit: Int = 100): [Chunk]
  }
`;
