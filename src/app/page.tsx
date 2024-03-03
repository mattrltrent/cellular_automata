"use client";

import Grid from '@/components/Grid';
import Menu from '@/components/Menu';
import { AppProps } from 'next/app';
import styles from '../styles/Page.module.css';

function Home({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.page}> 
      <Grid />
    </div>
  );
}

export default Home;
