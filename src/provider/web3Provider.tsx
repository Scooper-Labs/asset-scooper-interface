"use client";

import { ReactNode } from "react";
import {
	metadata,
	wagmiAdapter,
	WALLETCONNECT_PROJECT_ID,
} from "@/constants/config";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

import { createAppKit } from "@reown/appkit/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ETH_CHAINS } from "@/utils/network";

// Setup queryClient
const queryClient = new QueryClient();

// if (!WALLETCONNECT_PROJECT_ID) throw new Error("Project ID is not defined");


// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// Create the modal
const modal = createAppKit({
	adapters: [wagmiAdapter],
	projectId: WALLETCONNECT_PROJECT_ID,
	networks: ETH_CHAINS,
	defaultNetwork: ETH_CHAINS[0],
	metadata: metadata,
	features: {
		analytics: true, // Optional - defaults to your Cloud configuration
	},
});
export default function Web3ModalAppKitProvider({
	children,
	cookies,
}: {
	children: ReactNode;
	cookies: string | null;
}) {
	const initialState = cookieToInitialState(
		wagmiAdapter.wagmiConfig as Config,
		cookies,
	);

	return (
		<WagmiProvider
			config={wagmiAdapter.wagmiConfig as Config}
			initialState={initialState}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
