// import { http, createConfig } from "wagmi";
// import { base } from "wagmi/chains";
// import { coinbaseWallet } from "wagmi/connectors";

// export const wagmiConfig = createConfig({
//   chains: [base],
//   connectors: [
//     coinbaseWallet({
//       appName: "Asset Scooper",
//       preference: "smartWalletOnly",
//     }),
//   ],
//   transports: {
//     [base.id]: http(),
//   },
// });

// declare module "wagmi" {
//   interface Register {
//     config: typeof wagmiConfig;
//   }
// }
