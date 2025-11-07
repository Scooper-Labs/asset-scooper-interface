"use client";

import { FC, ReactNode } from "react";
import ChakraProvider from "./chakra";
import TokenListProvider from "./tokenListProvider";
import ApolloClientProvider from "./apolloProvider";
import Web3ModalAppKitProvider from "./web3Provider";
export const RootProvider = ({
	children,
	cookies,
}: {
	children: ReactNode;
	cookies: string | null;
}) => {
	return (
		<Web3ModalAppKitProvider cookies={cookies}>
			<TokenListProvider>
				<ChakraProvider>
					<ApolloClientProvider>{children}</ApolloClientProvider>
				</ChakraProvider>
			</TokenListProvider>
		</Web3ModalAppKitProvider>
	);
};
