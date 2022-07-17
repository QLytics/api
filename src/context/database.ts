import { DataSource } from 'apollo-datasource';

import { Block, Chunk } from '../schema';

export class Database extends DataSource {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async addBlocks(blocks: Block[]): Promise<Block[]> {
    return [];
  }

  public async getBlock(hash: string): Promise<Block> {
    return {
      hash,
      height: '',
      prev_hash: '',
      timestamp: '',
      total_supply: '',
      gas_price: '',
      author_account_id: ''
    };
  }

  public async getBlocks(since_hash: string, limit = 100): Promise<Block[]> {
    return [
      {
        hash: String(limit),
        height: '',
        prev_hash: '',
        timestamp: '',
        total_supply: '',
        gas_price: '',
        author_account_id: ''
      }
    ];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async addChunks(chunks: Chunk[]): Promise<Chunk[]> {
    return [];
  }

  public async getChunk(hash: string): Promise<Chunk> {
    return {
      hash,
      block_hash: '',
      shard_id: '',
      signature: '',
      gas_used: '',
      gas_limit: '',
      author_account_id: ''
    };
  }

  public async getChunks(since_hash: string, limit = 100): Promise<Chunk[]> {
    return [
      {
        hash: String(limit),
        block_hash: '',
        shard_id: '',
        signature: '',
        gas_used: '',
        gas_limit: '',
        author_account_id: ''
      }
    ];
  }
}
