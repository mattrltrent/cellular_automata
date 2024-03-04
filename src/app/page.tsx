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
      <Grid />
    </Provider>
  );
}
