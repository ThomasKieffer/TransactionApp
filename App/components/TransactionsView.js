import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { useMoralis } from 'react-moralis';
import { contractAddress } from '../constants';
import GET_TRANSACTIONS from '../constants/subgraphQueries';
import { Table, LinkTo } from '@web3uikit/core';
import { Checkmark, CrossCircle } from '@web3uikit/icons';

export default function TransactionView() {
  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = chainIdHex ? parseInt(chainIdHex).toString() : '1337';
  const transactionContractAddress = chainId ? contractAddress[chainId] : null;

  const {
    loading,
    error,
    data: transactions,
    startPolling,
  } = useQuery(GET_TRANSACTIONS, {
    // pollInterval: 1000,
  });

  useEffect(() => {
    startPolling(500);
    console.log('polling');
  }, [startPolling]);

  return (
    <div className="px-5">
      {isWeb3Enabled ? (
        loading || !transactions ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <Table
              columnsConfig="20px 2fr 2fr 2fr 2fr 2fr 60px 10px"
              data={Array.from(transactions.transfereds, (tx) => [
                '',
                <LinkTo
                  address={
                    'https://goerli.etherscan.io/tx/' + tx.transactionHash
                  }
                  iconLayout="leading"
                  onClick={function noRefCheck() {}}
                  text={
                    tx.transactionHash.slice(0, 6) +
                    '...' +
                    tx.transactionHash.slice(tx.transactionHash.length - 4)
                  }
                  type="external"
                />,
                <LinkTo
                  address={
                    'https://goerli.etherscan.io/block/' + tx.blockNumber
                  }
                  iconLayout="leading"
                  onClick={function noRefCheck() {}}
                  text={tx.blockNumber}
                  type="external"
                />,
                <LinkTo
                  address={'https://goerli.etherscan.io/address/' + tx.from}
                  iconLayout="leading"
                  onClick={function noRefCheck() {}}
                  text={
                    tx.from.slice(0, 6) +
                    '...' +
                    tx.from.slice(tx.from.length - 4)
                  }
                  type="external"
                />,
                <LinkTo
                  address={'https://goerli.etherscan.io/address/' + tx.to}
                  iconLayout="leading"
                  onClick={function noRefCheck() {}}
                  text={
                    tx.to.slice(0, 6) + '...' + tx.to.slice(tx.to.length - 4)
                  }
                  type="external"
                />,
                tx.amount / 10 ** 18 + 'ETH',
                tx.status ? (
                  <Checkmark fontSize="25px" color="green" />
                ) : (
                  <CrossCircle fontSize="25px" color="red" />
                ),
                '',
              ])}
              header={[
                '',
                <span key="0">Hash</span>,
                <span key="1">Block</span>,
                <span key="2">From</span>,
                <span key="3">To</span>,
                <span key="4">Amount</span>,
                <span key="5">Status</span>,
                '',
              ]}
              isColumnSortable={[
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ]}
              onPageNumberChanged={function noRefCheck() {}}
              onRowClick={function noRefCheck() {}}
              pageSize={5}
            />
          </div>
        )
      ) : (
        <h1>web3 not enabled</h1>
      )}
    </div>
  );
}
