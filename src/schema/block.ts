import { gql } from 'apollo-server-cloudflare';

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
  since_hash?: string;
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

export async function getBlock(env: Env, hash: string): Promise<Block> {
  const block = await env.DB.prepare('SELECT * FROM blocks WHERE hash = ?1')
    .bind(hash)
    .first<Block>();
  return block;
}

export async function getBlocks(
  env: Env,
  since_hash?: string,
  limit = 100
): Promise<Block[]> {
  let rowid = 0;
  if (since_hash != null) {
    try {
      rowid = (
        await env.DB.prepare('SELECT rowid FROM blocks WHERE hash = ?1')
          .bind(since_hash)
          .first<{ rowid: number }>()
      ).rowid;
    } catch (err) {
      console.error(err);
      // ignore
    }
  }
  const res = await env.DB.prepare(
    'SELECT * FROM blocks WHERE rowid > ?1 LIMIT ?2'
  )
    .bind(rowid, limit)
    .all<Block>();
  return res.results ?? [];
}
