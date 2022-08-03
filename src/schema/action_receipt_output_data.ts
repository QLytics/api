import { gql } from 'apollo-server-cloudflare';

export interface ActionReceiptOutputData {
  data_id: string;
  receipt_id: string;
  receiver_id: string;
}

export interface GetActionReceiptOutputDatas {
  since_data_id: string;
  limit?: number;
}

export const ActionReceiptOutputDataType = gql`
  type ActionReceiptOutputData {
    data_id: ID!
    receipt_id: String!
    receiver_id: String!
  }
`;

export const NewActionReceiptOutputDataType = gql`
  input NewActionReceiptOutputData {
    data_id: ID!
    receipt_id: String!
    receiver_id: String!
  }
`;
