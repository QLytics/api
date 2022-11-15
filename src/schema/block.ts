import { gql } from 'apollo-server-cloudflare';

export interface Block {
  hash: string;
  height: string;
  prev_hash: string;
  timestamp: string;
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
    hash: ID!
    height: String!
    prev_hash: String!
    timestamp: String!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }
`;

export const NewBlockType = gql`
  input NewBlock {
    hash: ID!
    height: String!
    prev_hash: String!
    timestamp: String!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }
`;

export function getBlockPrepare(env: Env): D1PreparedStatement {
  return env.DB.prepare(
    `INSERT INTO blocks (
    hash,
    height,
    prev_hash,
    timestamp,
    total_supply,
    gas_price,
    author_account_id
  ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
  );
}

export function bindBlock(
  prepare: D1PreparedStatement,
  block: Block
): D1PreparedStatement {
  return prepare.bind(
    block.hash,
    block.height,
    block.prev_hash,
    block.timestamp,
    block.total_supply,
    block.gas_price,
    block.author_account_id
  );
}

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
