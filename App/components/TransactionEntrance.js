import { useWeb3Contract } from 'react-moralis';
import { contractAddress, abi } from '../constants';
import { useMoralis } from 'react-moralis';
import { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Input, useNotification } from '@web3uikit/core';
import { Bell } from '@web3uikit/icons';

export default function TransactionEntrance({ setSeed }) {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const transactionContractAddress = chainId ? contractAddress[chainId] : null;
  const [addresseReceiver, setAddresseReceiver] = useState('');
  const [amount, setAmount] = useState(0);
  const dispatch = useNotification();

  const {
    data,
    error,
    runContractFunction: sendTransation,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: transactionContractAddress,
    functionName: 'transfer',
    params: {
      _to: addresseReceiver,
    },
    msgValue: amount * 10 ** 18,
  });

  const handleSucess = async function (tx) {
    await tx.wait(1);
    handleNewNotification(tx);
    setSeed(Math.random());
  };

  const handleNewNotification = function () {
    dispatch({
      type: 'info',
      message: 'Transaction completed',
      title: 'Tx Notification',
      position: 'topR',
      icon: <Bell fontSize="30px" />,
    });
  };

  function handleOnChangeAmount(event) {
    const { value } = event.target;
    setAmount(value);
  }

  function handleOnChangeAddress(event) {
    const { value } = event.target;
    setAddresseReceiver(value);
  }

  return (
    <div className="p-5 flex justify-center">
      {transactionContractAddress ? (
        <div>
          <div className="py-5">
            <Input
              label="Amount (ethers units)"
              openByDefault
              placeholder="Ex: 10.5"
              type="number"
              step="any"
              validation={{ numberMin: 0.000000000000000001 }}
              onChange={handleOnChangeAmount}
              required
            />
          </div>
          <div className="py-5">
            <Input
              label="Address"
              openByDefault
              placeholder="Ex: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
              onChange={handleOnChangeAddress}
              validation={{
                regExp: '^0x([A-Fa-f0-9]{40})$',
                regExpInvalidMessage: 'Incorrect Address',
              }}
              required
            />
          </div>

          <div className="py-5 flex justify-center">
            <Button
              onClick={async function () {
                await sendTransation({
                  onSuccess: handleSucess,
                  onError: (error) => console.log(error),
                });
              }}
              text="Send"
              theme="moneyPrimary"
            />
          </div>
        </div>
      ) : (
        <div>No transaction contract address detected</div>
      )}
    </div>
  );
}
