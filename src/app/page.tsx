"use client";

import Head from "next/head";
import Grid from "@/components/Grid";
import { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params, searchParams }: PageProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Conway's Game of Life</title> 
        <meta name="description" content="Explore Conway's Game of Life, a cellular automaton devised by mathematician John Conway." /> {/* Description for SEO and sharing */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid />
    </Provider>
  );
}
