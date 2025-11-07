
import {
  SITE_DESCRIPTION,
  SITE_ICON_URL,
  SITE_NAME,
  SITE_URL,
} from "@/utils/site";
import { ETH_CHAINS } from "@/utils/network";


export const WALLETCONNECT_PROJECT_ID = "b10ff2f14f1c8a4efecf95865ebb1ac2";

export const metadata = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  icons: [SITE_ICON_URL],
};



import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";


export const networks = ETH_CHAINS;

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage,
	}),
	ssr: true,
	projectId: WALLETCONNECT_PROJECT_ID,
	networks,
});

export const config = wagmiAdapter.wagmiConfig;

export const reown_metadata = {
	name: SITE_NAME,
	description: SITE_DESCRIPTION,
	url: SITE_URL,
	icons: [SITE_ICON_URL],
};