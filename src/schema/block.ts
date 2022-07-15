// export const Block = objectType({
//   name: 'Block',
//   definition: t => {
//     t.id('hash');
//     t.string('height');
//     t.string('prev_hash');
//     t.string('timestamp');
//     t.string('total_supply');
//     t.string('gas_price');
//     t.string('author_account_id');
//   }
// });

import { gql } from 'apollo-server-cloudflare';

export const Block = gql`
  type Block {
    hash: ID!
    height: String!
    prev_hash: String!
    timestamp: String!
    total_supply: String!
    gas_price: String!
    author_account_id: String!
  }
`;
