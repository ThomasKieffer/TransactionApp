import { ConnectButton } from '@web3uikit/web3';
import { useState } from 'react';
export default function Header({ seed }) {
  return (
    <div className="border-b-4 flex flex-row">
      <h1 className="py-4 px-4 font-mono text-3xl">Transaction App</h1>
      <div className="ml-auto py-2 px-4">
        <ConnectButton moralithAuth={false} key={seed} />
      </div>
    </div>
  );
}
