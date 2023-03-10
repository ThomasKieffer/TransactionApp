import { useQuery, gql } from '@apollo/client';

const GET_TRANSACTIONS = gql`
  {
    transfereds(first: 5) {
      id
      from
      to
      amount
      status
      blockNumber
    }
  }
`;

export default function GraphExemple() {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  console.log(data);
  return <div>hi</div>;
}
