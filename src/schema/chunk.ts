import { gql } from 'apollo-server-cloudflare';
import { Kysely } from 'kysely';

import { DbSchema } from '../context/db-schema';

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
  since_chunk_hash?: string;
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
export async function getChunk(
  db: Kysely<DbSchema>,
  hash: string
): Promise<Chunk | undefined> {
  const chunk = await db
    .selectFrom('chunks')
    .selectAll()
    .where('chunk_hash', '=', hash)
    .executeTakeFirst();
  return chunk;
}

export async function getChunks(
  db: Kysely<DbSchema>,
  since_chunk_hash?: string,
  limit = 100
): Promise<Chunk[]> {
  let rowid = 0;
  if (since_chunk_hash != null) {
    try {
      rowid =
        (
          await db
            .selectFrom('chunks')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .select('rowid' as any)
            .where('chunk_hash', '=', since_chunk_hash)
            .executeTakeFirst()
        )?.rowid ?? 0;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await db
    .selectFrom('chunks')
    .selectAll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .where('rowid' as any, '>', rowid)
    .limit(limit)
    .execute();
  return res;
}
