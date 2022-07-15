import { DataSource } from 'apollo-datasource';

export interface Block {
  hash: string;
  height: string;
  prev_hash: string;
  timestamp: string;
  total_supply: string;
  gas_price: string;
  author_account_id: string;
}

export interface IDatabase extends DataSource {
  getBlock(hash: string): Promise<Block>;
}
