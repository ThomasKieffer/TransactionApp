import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

export default function ManualHeader() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    isWeb3EnableLoading,
    Moralis,
    deactivateWeb3,
  } = useMoralis();

  // check if already connected
  useEffect(() => {
    if (isWeb3Enabled) {
      return;
    }
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('connected') == 'inject') {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  // check if account changed or disconnected
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log('Account changed to ', account);
      if (account == null) {
        window.localStorage.removeItem('connected');
        deactivateWeb3();
        console.log('Null account found');
      }
    });
  }, [account]);

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('connected', 'inject');
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
