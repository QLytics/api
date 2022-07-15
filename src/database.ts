import { DataSource } from 'apollo-datasource';

import { Block, IDatabase } from './type-defs';

export class Database extends DataSource implements IDatabase {
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
