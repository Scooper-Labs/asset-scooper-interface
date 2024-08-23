"use client";

import React, { ReactNode } from "react";
import {
  metadata,
  WALLETCONNECT_CONFIG,
  WALLETCONNECT_PROJECT_ID,
} from "@/constants/config";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!WALLETCONNECT_PROJECT_ID) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  metadata,
  //@ts-ignore
  wagmiConfig: WALLETCONNECT_CONFIG,
  projectId: WALLETCONNECT_PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: "light",
  themeVariables: {
    "--w3m-z-index": 50000,
    "--w3m-accent": "black",
    "--w3m-border-radius-master": "8px",
  },
});

export default function Web3ModalAppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={WALLETCONNECT_CONFIG} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
