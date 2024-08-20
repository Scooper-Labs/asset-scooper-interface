import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import { SITE_INFO, SITE_NAME, SITE_URL } from "@/utils/site";
import { ETH_CHAINS } from "@/utils/network";
import { http } from "wagmi";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";

import { base } from "viem/chains";

export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

if (!WALLETCONNECT_PROJECT_ID) {
  console.warn(
    "You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable"
  );
}

const metadata = {
  name: SITE_NAME,
  description: SITE_INFO,
  url: SITE_URL,
  icons: [],
};

export const WALLETCONNECT_CONFIG = defaultWagmiConfig({
  projectId: WALLETCONNECT_PROJECT_ID,
  transports: {
    [base.id]: http(),
  },
  chains: ETH_CHAINS,
  connectors: [
    walletConnect({
      //@ts-ignore
      projectId: WALLETCONNECT_PROJECT_ID,
      metadata,
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
      preference: "smartWalletOnly",
    }),
  ],
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
