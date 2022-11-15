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
  TransactionAction,
  bindBlock,
  bindChunk,
  bindReceipt,
  bindTransaction,
  bindTransactionAction,
  getBlock,
  getBlockPrepare,
  getBlocks,
  getChunk,
  getChunkPrepare,
  getChunks,
  getReceipt,
  getReceiptPrepare,
  getReceipts,
  getTransaction,
  getTransactionAction,
  getTransactionActionPrepare,
  getTransactionActions,
  getTransactionPrepare,
  getTransactions
} from '../schema';

export class Database extends DataSource {
  constructor(private env: Env) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async addBlockData(blockData: BlockData[]): Promise<number> {
    const blockPrepare = getBlockPrepare(this.env);
    const chunkPrepare = getChunkPrepare(this.env);
    const transactionPrepare = getTransactionPrepare(this.env);
    const transactionActionPrepare = getTransactionActionPrepare(this.env);
    const receiptPrepare = getReceiptPrepare(this.env);
    const queries = [];

    for (const data of blockData) {
      const { block, chunks, transactions, transaction_actions, receipts } =
        data;

      queries.push(bindBlock(blockPrepare, block));
      for (const chunk of chunks) {
        queries.push(bindChunk(chunkPrepare, chunk));
      }
      for (const transaction of transactions) {
        queries.push(bindTransaction(transactionPrepare, transaction));
      }
      for (const transactionAction of transaction_actions) {
        queries.push(
          bindTransactionAction(transactionActionPrepare, transactionAction)
        );
      }
      for (const receipt of receipts) {
        queries.push(bindReceipt(receiptPrepare, receipt));
      }
    }

    const res = await this.env.DB.batch(queries);
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

  public getBlock(hash: string): Promise<Block> {
    return getBlock(this.env, hash);
  }

  public getBlocks(since_hash?: string, limit?: number): Promise<Block[]> {
    return getBlocks(this.env, since_hash, limit);
  }

  public async getChunk(hash: string): Promise<Chunk> {
    return getChunk(this.env, hash);
  }

  public async getChunks(
    since_hash?: string,
    limit?: number
  ): Promise<Chunk[]> {
    return getChunks(this.env, since_hash, limit);
  }

  public async getTransaction(hash: string): Promise<Transaction> {
    return getTransaction(this.env, hash);
  }

  public async getTransactions(
    since_hash?: string,
    limit?: number
  ): Promise<Transaction[]> {
    return getTransactions(this.env, since_hash, limit);
  }

  public async getTransactionAction(hash: string): Promise<TransactionAction> {
    return getTransactionAction(this.env, hash);
  }

  public async getTransactionActions(
    since_hash?: string,
    limit?: number
  ): Promise<TransactionAction[]> {
    return getTransactionActions(this.env, since_hash, limit);
  }

  public async getReceipt(receipt_id: string): Promise<Receipt> {
    return getReceipt(this.env, receipt_id);
  }

  public async getReceipts(
    since_receipt_id?: string,
    limit?: number
  ): Promise<Receipt[]> {
    return getReceipts(this.env, since_receipt_id, limit);
  }

  public async getDataReceipt(data_id: string): Promise<DataReceipt> {
    return {
      data_id,
      receipt_id: '',
      data_base64: ''
    };
  }

  public async getDataReceipts(
    since_data_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<DataReceipt[]> {
    return [
      {
        data_id: '',
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
    since_receipt_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ActionReceipt[]> {
    return [
      {
        receipt_id: '',
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
    since_receipt_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ActionReceiptAction[]> {
    return [
      {
        receipt_id: '',
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
    since_data_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ActionReceiptInputData[]> {
    return [
      {
        data_id: '',
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
    since_data_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ActionReceiptOutputData[]> {
    return [
      {
        data_id: '',
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
    since_receipt_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ExecutionOutcome[]> {
    return [
      {
        receipt_id: '',
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
    since_receipt_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<ExecutionOutcomeReceipt[]> {
    return [
      {
        receipt_id: '',
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
    since_account_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<Account[]> {
    return [
      {
        account_id: '',
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
    since_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<AccountChange[]> {
    return [
      {
        id: '',
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
    since_public_key?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<AccessKey[]> {
    return [
      {
        public_key: '',
        account_id: '',
        permission_kind: '',
        last_update_block_height: ''
      }
    ];
  }
}
