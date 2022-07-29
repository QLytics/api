import { gql } from 'apollo-server-cloudflare';

export interface ExecutionOutcomeReceipt {
  receipt_id: string;
  index_in_execution_outcome: number;
  produced_receipt_id: string;
}

export interface GetExecutionOutcomeReceipts {
  since_receipt_id: string;
  limit?: number;
}

export const ExecutionOutcomeReceiptType = gql`
  type ExecutionOutcomeReceipt {
    receipt_id: String!
    index_in_execution_outcome: Int!
    produced_receipt_id: String!
  }
`;

export const NewExecutionOutcomeReceiptType = gql`
  input NewExecutionOutcomeReceipt {
    receipt_id: String!
    index_in_execution_outcome: Int!
    produced_receipt_id: String!
  }
`;
