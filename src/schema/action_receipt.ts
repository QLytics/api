import { gql } from 'apollo-server-cloudflare';

export interface ActionReceipt {
  receipt_id: string;
  signer_account_id: string;
  signer_public_key: string;
  gas_price: string;
}

export interface GetActionReceipts {
  since_receipt_id: string;
  limit?: number;
}

export const ActionReceiptType = gql`
  type ActionReceipt {
    receipt_id: String!
    signer_account_id: String!
    signer_public_key: String!
    gas_price: String!
  }
`;

export const NewActionReceiptType = gql`
  input NewActionReceipt {
    receipt_id: String!
    signer_account_id: String!
    signer_public_key: String!
    gas_price: String!
  }
`;
