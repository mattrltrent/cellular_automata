import { Inter } from "next/font/google";
import Head from "next/head"; 
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Conway\'s Game of Life',
  description: 'Conway\'s Game of Life: Matthew Trent\'s adaptation of the classic cellular automaton devised by mathematician John Conway.',
  icons: {
    icon: 'favicon.ico', 
    shortcut: 'favicon.ico', 
    apple: 'favicon.ico',
  },

  authors: [{ name: "Matthew Trent", url: "https://matthewtrent.me" }],
  keywords: ["game of life", "matthew trent", "cellular automata", "simulator", "conway", "john conway", "mathematics", "math", "game", "life", "cellular", "automata"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
