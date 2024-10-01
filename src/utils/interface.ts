interface MoralisWalletPortfolioApiResInterface {
  token_address: string;
  name: string;
  symbol: string;
  logo: string;
  thumbnail: string;
  decimals: number;
  balance: string;
  possible_spam: string;
  verified_collection: string;
  total_supply: string;
  total_supply_formatted: string;
  percentage_relative_to_total_supply: number;
}

export interface AssetsInterface {
  asset: {
    name: string;
    symbol: string;
    id: number;
    contracts: string[];
    logo: string;
    blockchains: string[];
  };
  realized_pnl: number;
  unrealized_pnl: number;
  allocation: number;
  price: number;
  price_bought: number;
  price_change_24h: number;
  price_change_1h: number;
  total_invested: number;
  min_buy_price: number;
  max_buy_price: number;
  estimated_balance: number;
  token_balance: number;
  cross_chain_balances: {
    [blockchain: string]: {
      balance: number;
      balanceRaw: string;
      chainId: string;
      address: string;
    };
  };
  contracts_balances: {
    balance: number;
    balanceRaw: string;
    chainId: string;
    address: string;
    decimals: number;
  }[];
}
export interface WalletPortfolioApiResInterface {
  total_wallet_balance: number;
  wallets: string[1];
  total_realized_pnl: number;
  total_unrealized_pnl: number;
  assets: AssetsInterface[];
}
export interface TXN_Interface {
  tokenIn: string;
  amountIn: string;
  amountOut: string;
  transactionHash: string;
  blockTimestamp: string;
  blockNumber: string;
}

export interface MoralisWalletPortfolioApiResponse {
  token_address: string;
  name: string;
  symbol: string;
  logo: string;
  thumbnail: string;
  decimals: number;
  balance: string | number;
  possible_spam: string;
  verified_collection: string;
  total_supply: string;
  total_supply_formatted: string;
  percentage_relative_to_total_supply: number;
}

export interface MoralisAssetInterface {
  balance: string;
  balance_formatted: string;
  decimals: number;
  logo: string;
  name: string;
  native_token: boolean;
  percentage_relative_to_total_supply: number | null;
  portfolio_percentage: number;
  possible_spam: boolean;
  symbol: string;
  thumbnail: string;
  token_address: string;
  total_supply: number | null;
  total_supply_formatted: number | null;
  usd_price: number;
  usd_price_24hr_percent_change: number;
  usd_price_24hr_usd_change: number;
  usd_value: number;
  usd_value_24hr_usd_change: number;
  verified_contract: boolean;
}

export interface DexScreenerTokenResponseInterface {
  schemaVersion: string;
  pairs: Pair[];
}

export interface Pair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  labels: string[];
  baseToken: BaseToken;
  quoteToken: QuoteToken;
  priceNative: string;
  priceUsd: string;
  txns: Txns;
  volume: Volume;
  priceChange: PriceChange;
  liquidity: Liquidity;
  fdv: number;
  pairCreatedAt: number;
}

export interface BaseToken {
  address: string;
  name: string;
  symbol: string;
}

export interface QuoteToken {
  address: string;
  name: string;
  symbol: string;
}

export interface Txns {
  m5: M5;
  h1: H1;
  h6: H6;
  h24: H24;
}

export interface M5 {
  buys: number;
  sells: number;
}

export interface H1 {
  buys: number;
  sells: number;
}

export interface H6 {
  buys: number;
  sells: number;
}

export interface H24 {
  buys: number;
  sells: number;
}

export interface Volume {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

export interface PriceChange {
  m5: number;
  h1: number;
  h6: number;
  h24: number;
}

export interface Liquidity {
  usd: number;
  base: number;
  quote: number;
}
