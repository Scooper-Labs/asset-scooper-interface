import { Address } from "viem";
import { ethers } from "ethers";

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

export const TokenOut = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48";
export const UNISWAP_V3_ROUTER = "0x2626664c2603336E57B271c5C0b26F421741e481";

export const ONEINCH_ROUTER_ADDRESSES: { [key in ChainId]: Address } = {
  [ChainId.ETHEREUM]: "0x111111125421ca6dc452d289314280a0f8842a65",
  [ChainId.BASE]: "0x111111125421ca6dc452d289314280a0f8842a65",
  [ChainId.ARBITRIUM]: "0x111111125421ca6dc452d289314280a0f8842a65",
  [ChainId.OPTIMISM]: "0x111111125421ca6dc452d289314280a0f8842a65",
  [ChainId.POLYGON]: "0x111111125421ca6dc452d289314280a0f8842a65",
};

export const SUBGRAPH =
  "https://api.studio.thegraph.com/query/91174/asset-scooper-base-mainnet/v0.0.1";
// "https://api.studio.thegraph.com/query/34803/asset-scooper/0.0.2";

export const TOKEN_PERMISSIONS_TYPEHASH = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("TokenPermissions(address token,uint256 amount)")
);
export const PERMIT_BATCH_TRANSFER_FROM_TYPEHASH = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(
    "PermitBatchTransferFrom(TokenPermissions[] permitted,address spender,uint256 nonce,uint256 deadline)TokenPermissions(address token,uint256 amount)"
  )
);
export const UPPER_BIT_MASK = BigInt(
  "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);
