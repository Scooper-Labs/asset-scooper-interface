import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { cookieStorage, createStorage } from "wagmi";
import {
  SITE_DESCRIPTION,
  SITE_ICON_URL,
  SITE_INFO,
  SITE_NAME,
  SITE_URL,
} from "@/utils/site";
import { ETH_CHAINS } from "@/utils/network";

// export const WALLETCONNECT_PROJECT_ID =
//   process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

export const WALLETCONNECT_PROJECT_ID = "b10ff2f14f1c8a4efecf95865ebb1ac2";

if (!WALLETCONNECT_PROJECT_ID) {
  console.warn(
    "You need to provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable"
  );
}

export const metadata = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  icons: [SITE_ICON_URL],
};

export const WALLETCONNECT_CONFIG = defaultWagmiConfig({
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: ETH_CHAINS,
  metadata: {
    name: SITE_NAME,
    description: SITE_INFO,
    url: SITE_URL,
    icons: [SITE_ICON_URL],
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
