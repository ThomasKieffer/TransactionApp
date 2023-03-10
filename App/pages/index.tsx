import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Header from '../components/Header';
import TransactionEntrance from '../components/TransactionEntrance';
import TransactionsView from '../components/TransactionsView';
import { useState } from 'react';


export default function Home() {
  const [seed, setSeed] = useState();

  return (
    <>
      <Head>
        <title>Transaction App</title>
        <meta name="description" content="Transaction app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header seed={seed}/>
      <TransactionEntrance setSeed={setSeed}/>
      <TransactionsView/>
    </>
  );
}
