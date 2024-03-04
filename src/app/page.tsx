"use client";

import Grid from '@/components/Grid';
import { AppProps } from 'next/app';
import styles from '../styles/Page.module.css';

function Home({ Component, pageProps }: AppProps) {
  return (
    <Grid />
  );
}

export default Home;
