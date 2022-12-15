import { gql } from 'apollo-server-cloudflare';
import { Kysely } from 'kysely';

import { DbSchema } from '../context/db-schema';

export interface Block {
  block_hash: string;
  block_height: string;
  prev_block_hash: string;
  block_timestamp: string;
  total_supply: string;
  gas_price: string;
  author_account_id: string;
}

export interface GetBlocks {
  since_block_hash?: string;
  limit?: number;
}

export const BlockType = gql`
  type Block {
    block_hash: ID!
    block_height: String!
    prev_block_hash: String!
    block_timestamp: String!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }
`;

export const NewBlockType = gql`
  input NewBlock {
    block_hash: ID!
    block_height: String!
    prev_block_hash: String!
    block_timestamp: String!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }
`;

export async function getBlock(
  db: Kysely<DbSchema>,
  hash: string
): Promise<Block | undefined> {
  const block = await db
    .selectFrom('blocks')
    .selectAll()
    .where('block_hash', '=', hash)
    .executeTakeFirst();
  return block;
}

export async function getBlocks(
  db: Kysely<DbSchema>,
  since_block_hash?: string,
  limit = 100
): Promise<Block[]> {
  let rowid = 0;
  if (since_block_hash != null) {
    try {
      rowid =
        (
          await db
            .selectFrom('blocks')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .select('rowid' as any)
            .where('block_hash', '=', since_block_hash)
            .executeTakeFirst()
        )?.rowid ?? 0;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await db
    .selectFrom('blocks')
    .selectAll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .where('rowid' as any, '>', rowid)
    .limit(limit)
    .execute();
  return res;
}
