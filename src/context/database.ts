import { DataSource } from 'apollo-datasource';

import {
  AccessKey,
  Account,
  AccountChange,
  ActionReceipt,
  ActionReceiptAction,
  ActionReceiptInputData,
  ActionReceiptOutputData,
  Block,
  BlockData,
  Chunk,
  DataReceipt,
  ExecutionOutcome,
  ExecutionOutcomeReceipt,
  GenesisBlockData,
  Receipt,
  Transaction,
  TransactionAction
} from '../schema';

export class Database extends DataSource {
  constructor(private env: Env) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async addBlockData(blockData: BlockData[]): Promise<number> {
    const blockPrepare = this.env.DB.prepare(
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
    const queries = [];

    for (const data of blockData) {
      const { block } = data;
      queries.push(
        blockPrepare.bind(
          block.hash,
          block.height,
          block.prev_hash,
          block.timestamp,
          block.total_supply,
          block.gas_price,
          block.author_account_id
        )
      );
    }
    const res = await this.env.DB.batch<Block>(queries);
    return res.length;
  }

  public async addGenesisBlockData(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blockData: GenesisBlockData[]
  ): Promise<number> {
    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async deleteAccounts(accountIds: string[]): Promise<number> {
    return 0;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getBlocks(since_hash: string, limit = 100): Promise<Block[]> {
    const res = await this.env.DB.prepare('SELECT * FROM blocks LIMIT ?1')
      .bind(limit)
      .all<Block>();
    return res.results ?? [];
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  public async getReceipt(receipt_id: string): Promise<Receipt> {
    return {
      receipt_id,
      block_hash: '',
      chunk_hash: '',
      chunk_index: 0,
      timestamp: '',
      predecessor_id: '',
      receiver_id: '',
      receipt_kind: '',
      transaction_hash: ''
    };
  }

  public async getReceipts(
    since_receipt_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<Receipt[]> {
    return [
      {
        receipt_id: since_receipt_id,
        block_hash: '',
        chunk_hash: '',
        chunk_index: 0,
        timestamp: '',
        predecessor_id: '',
        receiver_id: '',
        receipt_kind: '',
        transaction_hash: ''
      }
    ];
  }

  public async getDataReceipt(data_id: string): Promise<DataReceipt> {
    return {
      data_id,
      receipt_id: '',
      data_base64: ''
    };
  }

  public async getDataReceipts(
    since_data_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<DataReceipt[]> {
    return [
      {
        data_id: since_data_id,
        receipt_id: '',
        data_base64: ''
      }
    ];
  }

  public async getActionReceipt(receipt_id: string): Promise<ActionReceipt> {
    return {
      receipt_id,
      signer_account_id: '',
      signer_public_key: '',
      gas_price: ''
    };
  }

  public async getActionReceipts(
    since_receipt_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ActionReceipt[]> {
    return [
      {
        receipt_id: since_receipt_id,
        signer_account_id: '',
        signer_public_key: '',
        gas_price: ''
      }
    ];
  }

  public async getActionReceiptAction(
    receipt_id: string
  ): Promise<ActionReceiptAction> {
    return {
      receipt_id,
      index_in_action_receipt: 0,
      action_kind: '',
      args: '',
      predecessor_id: '',
      receiver_id: '',
      timestamp: ''
    };
  }

  public async getActionReceiptActions(
    since_receipt_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ActionReceiptAction[]> {
    return [
      {
        receipt_id: since_receipt_id,
        index_in_action_receipt: 0,
        action_kind: '',
        args: '',
        predecessor_id: '',
        receiver_id: '',
        timestamp: ''
      }
    ];
  }

  public async getActionReceiptInputData(
    data_id: string
  ): Promise<ActionReceiptInputData> {
    return {
      data_id,
      receipt_id: ''
    };
  }

  public async getActionReceiptInputDatas(
    since_data_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ActionReceiptInputData[]> {
    return [
      {
        data_id: since_data_id,
        receipt_id: ''
      }
    ];
  }

  public async getActionReceiptOutputData(
    data_id: string
  ): Promise<ActionReceiptOutputData> {
    return {
      data_id,
      receipt_id: '',
      receiver_id: ''
    };
  }

  public async getActionReceiptOutputDatas(
    since_data_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ActionReceiptOutputData[]> {
    return [
      {
        data_id: since_data_id,
        receipt_id: '',
        receiver_id: ''
      }
    ];
  }

  public async getExecutionOutcome(
    receipt_id: string
  ): Promise<ExecutionOutcome> {
    return {
      receipt_id,
      block_hash: '',
      chunk_index: 0,
      timestamp: '',
      gas_burnt: '',
      tokens_burnt: '',
      account_id: '',
      status: '',
      shard: ''
    };
  }

  public async getExecutionOutcomes(
    since_receipt_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ExecutionOutcome[]> {
    return [
      {
        receipt_id: since_receipt_id,
        block_hash: '',
        chunk_index: 0,
        timestamp: '',
        gas_burnt: '',
        tokens_burnt: '',
        account_id: '',
        status: '',
        shard: ''
      }
    ];
  }

  public async getExecutionOutcomeReceipt(
    receipt_id: string
  ): Promise<ExecutionOutcomeReceipt> {
    return {
      receipt_id,
      index_in_execution_outcome: 0,
      produced_receipt_id: ''
    };
  }

  public async getExecutionOutcomeReceipts(
    since_receipt_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ExecutionOutcomeReceipt[]> {
    return [
      {
        receipt_id: since_receipt_id,
        index_in_execution_outcome: 0,
        produced_receipt_id: ''
      }
    ];
  }

  public async getAccount(account_id: string): Promise<Account> {
    return {
      account_id,
      last_update_block_height: ''
    };
  }

  public async getAccounts(
    since_account_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<Account[]> {
    return [
      {
        account_id: since_account_id,
        last_update_block_height: ''
      }
    ];
  }

  public async getAccountChange(id: string): Promise<AccountChange> {
    return {
      id,
      account_id: '',
      timestamp: '',
      block_hash: '',
      transaction_hash: '',
      receipt_id: '',
      update_reason: '',
      nonstaked_balance: '',
      staked_balance: '',
      storage_usage: '',
      index_in_block: 0
    };
  }

  public async getAccountChanges(
    since_id: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<AccountChange[]> {
    return [
      {
        id: since_id,
        account_id: '',
        timestamp: '',
        block_hash: '',
        transaction_hash: '',
        receipt_id: '',
        update_reason: '',
        nonstaked_balance: '',
        staked_balance: '',
        storage_usage: '',
        index_in_block: 0
      }
    ];
  }

  public async getAccessKey(public_key: string): Promise<AccessKey> {
    return {
      public_key,
      account_id: '',
      permission_kind: '',
      last_update_block_height: ''
    };
  }

  public async getAccessKeys(
    since_public_key: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<AccessKey[]> {
    return [
      {
        public_key: since_public_key,
        account_id: '',
        permission_kind: '',
        last_update_block_height: ''
      }
    ];
  }
}
