import '@/styles/globals.css';
import { NotificationProvider } from '@web3uikit/core';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';

import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/42153/transactionapp/v0.0.9"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </ApolloProvider>
    </MoralisProvider>
  );
}
