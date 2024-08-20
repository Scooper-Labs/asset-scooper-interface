"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SITE_INFO, SITE_NAME, SITE_URL } from "@/utils/site";
import { ETH_CHAINS } from "@/utils/network";
import { ReactNode } from "react";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createConfig } from "wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";

export const RAINBOWKIT_PROJECT_ID =
  process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID ?? "";

if (!RAINBOWKIT_PROJECT_ID) {
  console.warn(
    "You need to provide a NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID env variable"
  );
}

const metadata = {
  name: SITE_NAME,
  description: SITE_INFO,
  url: SITE_URL,
  icons: [],
};

const config = getDefaultConfig({
  appName: metadata.name,
  projectId: RAINBOWKIT_PROJECT_ID,
  chains: ETH_CHAINS,
  appDescription: metadata.description,
  appIcon: metadata.icons[0],
  appUrl: metadata.url,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

const queryClient = new QueryClient();

export const RainbowKitModal = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
