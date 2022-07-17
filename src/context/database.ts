import { DataSource } from 'apollo-datasource';

import { Block } from '../schema';

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
}
