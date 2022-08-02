import { DataSource } from 'apollo-datasource';

import {
  ActionReceiptAction,
  ActionReceiptInputData,
  Block,
  BlockData,
  Chunk,
  DataReceipt,
  ExecutionOutcome,
  ExecutionOutcomeReceipt,
  Receipt,
  Transaction,
  TransactionAction
} from '../schema';
import { ActionReceipt } from '../schema/action_receipt';

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
    limit = 100
  ): Promise<ActionReceiptInputData[]> {
    return [
      {
        data_id: since_data_id,
        receipt_id: ''
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
}
