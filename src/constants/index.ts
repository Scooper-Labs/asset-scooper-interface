import { Address } from "viem";

export const ONE_INCH_BASE_URI = "https://api.1inch.dev/swap/v6.0/";
export const ONE_INCH_HISTORY_BASE_URL = "https://api.1inch.dev/history/v2.0/";

export enum ChainId {
  ETHEREUM = 1,
  BASE = 8453,
  ARBITRIUM = 42161,
  OPTIMISM = 10,
  POLYGON = 137,
  // OPTIMISM = 10,
  // OPTIMISM = 10,
}

export const ONEINCH_ROUTER_ADDRESSES: { [key in ChainId]: Address } = {
  [ChainId.ETHEREUM]: "0x111111125421ca6dc452d289314280a0f8842a65",
  [ChainId.BASE]: "0x111111125421ca6dc452d289314280a0f8842a65",
  [ChainId.ARBITRIUM]: "0x111111125421ca6dc452d289314280a0f8842a65",
  [ChainId.OPTIMISM]: "0x111111125421ca6dc452d289314280a0f8842a65",
  [ChainId.POLYGON]: "0x111111125421ca6dc452d289314280a0f8842a65",
};

export const SUBGRAPH =
  "https://api.studio.thegraph.com/query/34803/asset-scooper/0.0.2";
