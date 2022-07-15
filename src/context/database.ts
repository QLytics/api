import { DataSource } from 'apollo-datasource';

import { Block } from '../schema';

export class Database extends DataSource {
  constructor() {
    super();
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
}
