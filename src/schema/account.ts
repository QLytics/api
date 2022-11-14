import { gql } from 'apollo-server-cloudflare';

export interface Account {
  account_id: string;
  created_by_receipt_id?: string;
  deleted_by_receipt_id?: string;
  last_update_block_height: number;
}

export interface GetAccounts {
  since_account_id?: string;
  limit?: number;
}

export const AccountType = gql`
  type Account {
    account_id: ID!
    created_by_receipt_id: String
    deleted_by_receipt_id: String
    last_update_block_height: Int!
  }
`;

export const NewAccountType = gql`
  input NewAccount {
    account_id: ID!
    created_by_receipt_id: String
    deleted_by_receipt_id: String
    last_update_block_height: Int!
  }
`;
