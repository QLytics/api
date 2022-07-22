import { DataSource } from 'apollo-datasource';

import {
  Block,
  BlockData,
  Chunk,
  Transaction,
  TransactionAction
} from '../schema';

export class Database extends DataSource {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async addBlockData(blockData: BlockData[]): Promise<Block[]> {
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
        hash: since_hash,
        height: '',
        prev_hash: '',
        timestamp: '',
        total_supply: '',
        gas_price: '',
        author_account_id: ''
      }
    ];
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
        hash: since_hash,
        block_hash: '',
        shard_id: '',
        signature: '',
        gas_used: '',
        gas_limit: '',
        author_account_id: ''
      }
    ];
  }

  public async getTransaction(hash: string): Promise<Transaction> {
    return {
      hash,
      block_hash: '',
      chunk_hash: '',
      chunk_index: 0,
      timestamp: '',
      signer_id: '',
      public_key: '',
      nonce: '',
      receiver_id: '',
      signature: '',
      status: '',
      receipt_id: '',
      gas_burnt: '',
      tokens_burnt: ''
    };
  }

  public async getTransactions(
    since_hash: string,
    limit = 100
  ): Promise<Transaction[]> {
    return [
      {
        hash: since_hash,
        block_hash: '',
        chunk_hash: '',
        chunk_index: 0,
        timestamp: '',
        signer_id: '',
        public_key: '',
        nonce: '',
        receiver_id: '',
        signature: '',
        status: '',
        receipt_id: '',
        gas_burnt: '',
        tokens_burnt: ''
      }
    ];
  }

  public async getTransactionAction(hash: string): Promise<TransactionAction> {
    return {
      hash,
      transaction_index: 0,
      action_kind: '',
      args: ''
    };
  }

  public async getTransactionActions(
    since_hash: string,
    limit = 100
  ): Promise<TransactionAction[]> {
    return [
      {
        hash: since_hash,
        transaction_index: 0,
        action_kind: '',
        args: ''
      }
    ];
  }
}
