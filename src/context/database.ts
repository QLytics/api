import { DataSource } from 'apollo-datasource';
import { Kysely } from 'kysely';
import { D1Dialect } from 'kysely-d1';

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
  getActionReceipt,
  getActionReceiptAction,
  getActionReceiptActionPrepare,
  getActionReceiptActions,
  getActionReceiptInputData,
  getActionReceiptInputDataPrepare,
  getActionReceiptInputDatas,
  getActionReceiptOutputData,
  getActionReceiptOutputDataPrepare,
  getActionReceiptOutputDatas,
  getActionReceipts,
  getBlock,
  getBlocks,
  getChunk,
  getChunks,
  getDataReceipt,
  getDataReceipts,
  getReceipt,
  getReceipts,
  getTransaction,
  getTransactionAction,
  getTransactionActions,
  getTransactions
} from '../schema';

import { DbSchema } from './db-schema';

export class Database extends DataSource {
  constructor(private env: Env) {
    super();
  }

  public async addBlockData(blockData: BlockData[]): Promise<number> {
    const db = new Kysely<DbSchema>({
      dialect: new D1Dialect({ database: this.env.DB })
    });

    const actionReceiptActionPrepare = getActionReceiptActionPrepare(this.env);
    const actionReceiptInputDataPrepare = getActionReceiptInputDataPrepare(
      this.env
    );
    const actionReceiptOutputDataPrepare = getActionReceiptOutputDataPrepare(
      this.env
    );
    const queries: D1PreparedStatement[] = [];

    for (const data of blockData) {
      const {
        block,
        chunks,
        transactions,
        transaction_actions,
        receipts,
        data_receipts,
        action_receipts,
        action_receipt_actions,
        action_receipt_input_datas,
        action_receipt_output_datas
      } = data;

      try {
        db.insertInto('blocks')
          .values(block)
          .onConflict(oc => oc.doNothing())
          .execute();
        if (chunks.length > 0) {
          db.insertInto('chunks')
            .onConflict(oc => oc.doNothing())
            .values(chunks)
            .execute();
        }
        if (transactions.length > 0) {
          db.insertInto('transactions')
            .values(transactions)
            .onConflict(oc => oc.doNothing())
            .execute();
        }
        if (transaction_actions.length > 0) {
          db.insertInto('transaction_actions')
            .values(transaction_actions)
            .onConflict(oc => oc.doNothing())
            .execute();
        }
        if (receipts.length > 0) {
          db.insertInto('receipts')
            .values(receipts)
            .onConflict(oc => oc.doNothing())
            .execute();
        }
        if (data_receipts.length > 0) {
          const dataReceipts = data_receipts.map(
            ({ data_id, receipt_id, data_base64 }): DataReceipt => ({
              data_id,
              receipt_id,
              data: data_base64
                ? Array.from(base64ToUint8Array(data_base64))
                : undefined
            })
          );
          db.insertInto('data_receipts')
            .values(dataReceipts)
            .onConflict(oc => oc.doNothing())
            .execute();
        }
        if (action_receipts.length > 0) {
          db.insertInto('action_receipts')
            .values(action_receipts)
            .onConflict(oc => oc.doNothing())
            .execute();
        }
      } catch (err) {
        console.error(err);
        return 0;
      }
      // for (const actionReceiptAction of action_receipt_actions) {
      //   queries.push(
      //     bindActionReceiptAction(
      //       actionReceiptActionPrepare,
      //       actionReceiptAction
      //     )
      //   );
      // }
      // for (const actionReceiptInputData of action_receipt_input_datas) {
      //   queries.push(
      //     bindActionReceiptInputData(
      //       actionReceiptInputDataPrepare,
      //       actionReceiptInputData
      //     )
      //   );
      // }
      // for (const actionReceiptOutputData of action_receipt_output_datas) {
      //   queries.push(
      //     bindActionReceiptOutputData(
      //       actionReceiptOutputDataPrepare,
      //       actionReceiptOutputData
      //     )
      //   );
      // }
    }

    try {
      this.env.DB.batch(queries);
      return queries.length;
    } catch (err) {
      console.error(err);
      return 0;
    }
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
    return getDataReceipt(this.env, data_id);
  }

  public async getDataReceipts(
    since_data_id?: string,
    limit?: number
  ): Promise<DataReceipt[]> {
    return getDataReceipts(this.env, since_data_id, limit);
  }

  public async getActionReceipt(receipt_id: string): Promise<ActionReceipt> {
    return getActionReceipt(this.env, receipt_id);
  }

  public async getActionReceipts(
    since_receipt_id?: string,
    limit?: number
  ): Promise<ActionReceipt[]> {
    return getActionReceipts(this.env, since_receipt_id, limit);
  }

  public async getActionReceiptAction(
    receipt_id: string
  ): Promise<ActionReceiptAction> {
    return getActionReceiptAction(this.env, receipt_id);
  }

  public async getActionReceiptActions(
    since_receipt_id?: string,
    limit?: number
  ): Promise<ActionReceiptAction[]> {
    return getActionReceiptActions(this.env, since_receipt_id, limit);
  }

  public async getActionReceiptInputData(
    data_id: string
  ): Promise<ActionReceiptInputData> {
    return getActionReceiptInputData(this.env, data_id);
  }

  public async getActionReceiptInputDatas(
    since_data_id?: string,
    limit?: number
  ): Promise<ActionReceiptInputData[]> {
    return getActionReceiptInputDatas(this.env, since_data_id, limit);
  }

  public async getActionReceiptOutputData(
    data_id: string
  ): Promise<ActionReceiptOutputData> {
    return getActionReceiptOutputData(this.env, data_id);
  }

  public async getActionReceiptOutputDatas(
    since_data_id?: string,
    limit?: number
  ): Promise<ActionReceiptOutputData[]> {
    return getActionReceiptOutputDatas(this.env, since_data_id, limit);
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

function base64ToUint8Array(base64: string): Uint8Array {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}
