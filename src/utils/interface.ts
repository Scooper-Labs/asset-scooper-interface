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
