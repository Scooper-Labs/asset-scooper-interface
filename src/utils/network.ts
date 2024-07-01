import {
  mainnet,
  arbitrum,
  base,
  linea,
  polygon,
  optimism,
  scroll,
} from "viem/chains";
import { Chain, hardhat, sepolia } from "viem/chains";

let chains = [mainnet, arbitrum, base, linea, polygon, optimism, scroll] as [
  Chain,
  ...Chain[]
];

if (process.env.NODE_ENV !== "production") chains.push(sepolia, hardhat);

export const ETH_CHAINS = chains;

export const NETWORK_COLORS = {
  ethereum: {
    color: "green",
    bgVariant: "#2F855A",
  },
  arbitrum: {
    color: "sky",
    bgVariant: "#2B6CB0",
  },
  base: {
    color: "blue",
    bgVariant: "#2B6CB0",
  },
  linea: {
    color: "slate",
    bgVariant: "bg-slate-600",
  },
  polygon: {
    color: "purple",
    bgVariant: "#6B46C1",
  },
  optimism: {
    color: "red",
    bgVariant: "#C53030",
  },
  scroll: {
    color: "amber",
    bgVariant: "bg-amber-600",
  },
  other: {
    color: "gray",
    bgVariant: "#4A5568",
  },
};

export function GetNetworkColor(
  chain?: string,
  type: "color" | "bgVariant" = "color"
) {
  chain = chain?.toLocaleLowerCase();
  if (chain === "ethereum" || chain === "mainnet" || chain === "homestead")
    return NETWORK_COLORS.ethereum[type];
  if (chain?.includes("arbitrum")) return NETWORK_COLORS.arbitrum[type];
  if (chain?.includes("base")) return NETWORK_COLORS.base[type];
  if (chain?.includes("linea")) return NETWORK_COLORS.linea[type];
  if (chain?.includes("polygon") || chain?.includes("matic"))
    return NETWORK_COLORS.polygon[type];
  if (chain?.includes("optimism") || chain?.startsWith("op"))
    return NETWORK_COLORS.optimism[type];
  if (chain?.includes("scroll")) return NETWORK_COLORS.scroll[type];

  return NETWORK_COLORS.other[type];
}
