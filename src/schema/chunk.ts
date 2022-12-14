import { gql } from 'apollo-server-cloudflare';

export interface Chunk {
  chunk_hash: string;
  included_in_block_hash: string;
  shard_id: string;
  signature: string;
  gas_limit: string;
  gas_used: string;
  author_account_id: string;
}

export interface GetChunks {
  since_hash?: string;
  limit?: number;
}

export const ChunkType = gql`
  type Chunk {
    chunk_hash: ID!
    included_in_block_hash: String!
    shard_id: String!
    signature: String!
    gas_limit: String!
    gas_used: String!
    author_account_id: String!
  }
`;

export const NewChunkType = gql`
  input NewChunk {
    chunk_hash: ID!
    included_in_block_hash: String!
    shard_id: String!
    signature: String!
    gas_limit: String!
    gas_used: String!
    author_account_id: String!
  }
`;

export async function getChunk(env: Env, hash: string): Promise<Chunk> {
  const chunk = await env.DB.prepare(
    'SELECT * FROM chunks WHERE chunk_hash = ?1'
  )
    .bind(hash)
    .first<Chunk>();
  return chunk;
}

export async function getChunks(
  env: Env,
  since_hash?: string,
  limit = 100
): Promise<Chunk[]> {
  let rowid = 0;
  if (since_hash != null) {
    try {
      rowid = (
        await env.DB.prepare('SELECT rowid FROM chunks WHERE chunk_hash = ?1')
          .bind(since_hash)
          .first<{ rowid: number }>()
      ).rowid;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await env.DB.prepare(
    'SELECT * FROM chunks WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<Chunk>();
  return res.results ?? [];
}
