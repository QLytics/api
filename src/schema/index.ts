import { gql } from 'apollo-server-cloudflare';

// import { Block } from './block';

export default gql`
  type Block {
    hash: ID!
    height: String!
    prev_hash: String!
    timestamp: String!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }

  input NewBlock {
    hash: ID!
    height: String!
    prev_hash: String!
    timestamp: String!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }

  type Mutation {
    addBlocks(blocks: [NewBlock!]!): [Block]
  }

  type Query {
    block(hash: ID!): Block
  }
`;

// export const typeDef: TypeSource = { Block };
