import { Inter } from "next/font/google";
import Head from "next/head"; // import Head
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import type { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Conway\'s Game of Life',
  description: 'Conway\'s Game of Life: Matthew Trent\'s adaptation of the classic cellular automaton devised by mathematician John Conway.',
  icons: {
    icon: 'favicon.ico', // Update the favicon paths
    shortcut: 'favicon.ico', // Update the favicon paths
    apple: 'favicon.ico', // Update the favicon paths
  },
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
