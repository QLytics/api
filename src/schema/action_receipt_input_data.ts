import { gql } from 'apollo-server-cloudflare';

export interface ActionReceiptInputData {
  data_id: string;
  receipt_id: string;
}

export interface GetActionReceiptInputDatas {
  since_data_id?: string;
  limit?: number;
}

export const ActionReceiptInputDataType = gql`
  type ActionReceiptInputData {
    data_id: ID!
    receipt_id: String!
  }
`;

export const NewActionReceiptInputDataType = gql`
  input NewActionReceiptInputData {
    data_id: ID!
    receipt_id: String!
  }
`;
