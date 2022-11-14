import { gql } from 'apollo-server-cloudflare';

export interface Transaction {
  hash: string;
  block_hash: string;
  chunk_hash: string;
  chunk_index: number;
  timestamp: string;
  signer_id: string;
  public_key: string;
  nonce: string;
  receiver_id: string;
  signature: string;
  status: string;
  receipt_id: string;
  gas_burnt: string;
  tokens_burnt: string;
}

export interface GetTransactions {
  since_hash?: string;
  limit?: number;
}

export const TransactionType = gql`
  type Transaction {
    hash: String!
    block_hash: String!
    chunk_hash: String!
    chunk_index: Int!
    timestamp: String!
    signer_id: String!
    public_key: String!
    nonce: String!
    receiver_id: String!
    signature: String!
    status: String!
    receipt_id: String!
    gas_burnt: String!
    tokens_burnt: String!
  }
`;

export const NewTransactionType = gql`
  input NewTransaction {
    hash: String!
    block_hash: String!
    chunk_hash: String!
    chunk_index: Int!
    timestamp: String!
    signer_id: String!
    public_key: String!
    nonce: String!
    receiver_id: String!
    signature: String!
    status: String!
    receipt_id: String!
    gas_burnt: String!
    tokens_burnt: String!
  }
`;
