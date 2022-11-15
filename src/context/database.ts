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
    const chunkPrepare = this.env.DB.prepare(
      `INSERT INTO chunks (
        hash,
        block_hash,
        shard_id,
        signature,
        gas_limit,
        gas_used,
        author_account_id
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
    );
    const transactionPrepare = this.env.DB.prepare(
      `INSERT INTO transactions (
        hash,
        block_hash,
        chunk_hash,
        chunk_index,
        timestamp,
        signer_id,
        public_key,
        nonce,
        receiver_id,
        signature,
        status,
        receipt_id,
        gas_burnt,
        tokens_burnt
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)`
    );
    const transactionActionPrepare = this.env.DB.prepare(
      `INSERT INTO transaction_actions (
        hash,
        transaction_index,
        action_kind,
        args
      ) VALUES (?1, ?2, ?3, ?4)`
    );
    const queries = [];

    for (const data of blockData) {
      const { block, chunks, transactions, transaction_actions } = data;

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

      for (const chunk of chunks) {
        queries.push(
          chunkPrepare.bind(
            chunk.hash,
            chunk.block_hash,
            chunk.shard_id,
            chunk.signature,
            chunk.gas_limit,
            chunk.gas_used,
            chunk.author_account_id
          )
        );
      }

      for (const transaction of transactions) {
        console.log('transaction', transaction);
        queries.push(
          transactionPrepare.bind(
            transaction.hash,
            transaction.block_hash,
            transaction.chunk_hash,
            transaction.chunk_index,
            transaction.timestamp,
            transaction.signer_id,
            transaction.public_key,
            transaction.nonce,
            transaction.receiver_id,
            transaction.signature,
            transaction.status,
            transaction.receipt_id,
            transaction.gas_burnt,
            transaction.tokens_burnt
          )
        );
      }

      for (const transactionAction of transaction_actions) {
        queries.push(
          transactionActionPrepare.bind(
            transactionAction.hash,
            transactionAction.transaction_index,
            transactionAction.action_kind,
            transactionAction.args
          )
        );
      }
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
    const block = await this.env.DB.prepare(
      'SELECT * FROM blocks WHERE hash = ?1'
    )
      .bind(hash)
      .first<Block>();
    return block;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getBlocks(since_hash?: string, limit = 100): Promise<Block[]> {
    let rowid = 0;
    if (since_hash != null) {
      try {
        rowid = (
          await this.env.DB.prepare('SELECT rowid FROM blocks WHERE hash = ?1')
            .bind(since_hash)
            .first<{ rowid: number }>()
        ).rowid;
      } catch (err) {
        console.error(err);
        // ignore
      }
    }
    const res = await this.env.DB.prepare(
      'SELECT * FROM blocks WHERE rowid > ?1 LIMIT ?2'
    )
      .bind(rowid, limit)
      .all<Block>();
    return res.results ?? [];
  }

  public async getChunk(hash: string): Promise<Chunk> {
    const chunk = await this.env.DB.prepare(
      'SELECT * FROM chunks WHERE hash = ?1'
    )
      .bind(hash)
      .first<Chunk>();
    return chunk;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getChunks(since_hash?: string, limit = 100): Promise<Chunk[]> {
    let rowid = 0;
    if (since_hash != null) {
      try {
        rowid = (
          await this.env.DB.prepare('SELECT rowid FROM chunks WHERE hash = ?1')
            .bind(since_hash)
            .first<{ rowid: number }>()
        ).rowid;
      } catch (err) {
        console.error(err);
        // ignore
      }
    }
    const res = await this.env.DB.prepare(
      'SELECT * FROM chunks WHERE rowid > ?1 LIMIT ?2'
    )
      .bind(rowid, limit)
      .all<Chunk>();
    return res.results ?? [];
  }

  public async getTransaction(hash: string): Promise<Transaction> {
    const transaction = await this.env.DB.prepare(
      'SELECT * FROM transactions WHERE hash = ?1'
    )
      .bind(hash)
      .first<Transaction>();
    return transaction;
  }

  public async getTransactions(
    since_hash?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<Transaction[]> {
    let rowid = 0;
    if (since_hash != null) {
      try {
        rowid = (
          await this.env.DB.prepare(
            'SELECT rowid FROM transactions WHERE hash = ?1'
          )
            .bind(since_hash)
            .first<{ rowid: number }>()
        ).rowid;
      } catch (err) {
        console.error(err);
        // ignore
      }
    }
    const res = await this.env.DB.prepare(
      'SELECT * FROM transactions WHERE rowid > ?1 LIMIT ?2'
    )
      .bind(rowid, limit)
      .all<Transaction>();
    return res.results ?? [];
  }

  public async getTransactionAction(hash: string): Promise<TransactionAction> {
    const transactionAction = await this.env.DB.prepare(
      'SELECT * FROM transaction_actions WHERE hash = ?1'
    )
      .bind(hash)
      .first<TransactionAction>();
    return transactionAction;
  }

  public async getTransactionActions(
    since_hash?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<TransactionAction[]> {
    let rowid = 0;
    if (since_hash != null) {
      try {
        rowid = (
          await this.env.DB.prepare(
            'SELECT rowid FROM transaction_actions WHERE hash = ?1'
          )
            .bind(since_hash)
            .first<{ rowid: number }>()
        ).rowid;
      } catch (err) {
        console.error(err);
        // ignore
      }
    }
    const res = await this.env.DB.prepare(
      'SELECT * FROM transaction_actions WHERE rowid > ?1 LIMIT ?2'
    )
      .bind(rowid, limit)
      .all<TransactionAction>();
    return res.results ?? [];
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
    since_receipt_id?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit = 100
  ): Promise<Receipt[]> {
    return [
      {
        receipt_id: '',
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
