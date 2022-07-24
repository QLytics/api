import { gql } from 'apollo-server-cloudflare';

export interface Receipt {
  receipt_id: string;
  block_hash: string;
  chunk_hash: string;
  chunk_index: number;
  timestamp: string;
  predecessor_id: string;
  receiver_id: string;
  receipt_kind: string;
  transaction_hash: string;
}

export interface GetReceipts {
  since_receipt_id: string;
  limit?: number;
}

export const ReceiptType = gql`
  type Receipt {
    receipt_id: String!
    block_hash: String!
    chunk_hash: String!
    chunk_index: Int!
    timestamp: String!
    predecessor_id: String!
    receiver_id: String!
    receipt_kind: String!
    transaction_hash: String!
  }
`;

export const NewReceiptType = gql`
  input NewReceipt {
    receipt_id: String!
    block_hash: String!
    chunk_hash: String!
    chunk_index: Int!
    timestamp: String!
    predecessor_id: String!
    receiver_id: String!
    receipt_kind: String!
    transaction_hash: String!
  }
`;
