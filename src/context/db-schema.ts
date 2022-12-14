import {
  ActionReceipt,
  Block,
  Chunk,
  DataReceipt,
  Receipt,
  Transaction,
  TransactionAction
} from '../schema';

export interface DbSchema {
  blocks: Block;
  chunks: Chunk;
  transactions: Transaction;
  transaction_actions: TransactionAction;
  receipts: Receipt;
  data_receipts: DataReceipt;
  action_receipts: ActionReceipt;
}
