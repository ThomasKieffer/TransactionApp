import { gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  {
    transfereds(orderBy: blockNumber, orderDirection: desc) {
      id
      from
      to
      amount
      status
      transactionHash
      blockNumber
    }
  }
`;

export default GET_TRANSACTIONS;
