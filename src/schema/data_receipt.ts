import { gql } from 'apollo-server-cloudflare';

export interface DataReceipt {
  data_id: string;
  receipt_id: string;
  data_base64: string;
}

export interface GetDataReceipts {
  since_data_id?: string;
  limit?: number;
}

export const DataReceiptType = gql`
  type DataReceipt {
    data_id: String!
    receipt_id: String!
    data_base64: String
  }
`;

export const NewDataReceiptType = gql`
  input NewDataReceipt {
    data_id: String!
    receipt_id: String!
    data_base64: String
  }
`;
