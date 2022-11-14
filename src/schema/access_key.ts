import { gql } from 'apollo-server-cloudflare';

export interface AccessKey {
  public_key: string;
  account_id: string;
  created_by_receipt_id?: string;
  deleted_by_receipt_id?: string;
  permission_kind: string;
  last_update_block_height: number;
}

export interface GetAccessKeys {
  since_public_key?: string;
  limit?: number;
}

export const AccessKeyType = gql`
  type AccessKey {
    public_key: String!
    account_id: String!
    created_by_receipt_id: String
    deleted_by_receipt_id: String
    permission_kind: String!
    last_update_block_height: Int!
  }
`;

export const NewAccessKeyType = gql`
  input NewAccessKey {
    public_key: String!
    account_id: String!
    created_by_receipt_id: String
    deleted_by_receipt_id: String
    permission_kind: String!
    last_update_block_height: Int!
  }
`;
