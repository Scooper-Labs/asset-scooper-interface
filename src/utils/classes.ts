import { AssetsInterface, WalletPortfolioApiResInterface } from "./interface";

export class WalletPortfolioClass {
  wallet: string;
  balance: number;
  realized_pnl: number;
  unrealized_pnl: number;
  assets: AssetClass[];
  constructor(ApiRes: WalletPortfolioApiResInterface) {
    let {
      total_wallet_balance,
      wallets,
      total_realized_pnl,
      total_unrealized_pnl,
      assets,
    } = ApiRes;
    this.wallet = wallets[0];
    this.balance = total_wallet_balance;
    this.realized_pnl = total_realized_pnl;
    this.unrealized_pnl = total_unrealized_pnl;
    this.assets = assets.map((asset) => new AssetClass(asset));
  }
}

export class AssetClass {
  name: string;
  symbol: string;
  logoURI: string;
  userBalance: number;
  quoteUSD: number;
  price: number;
  price_change_24h: number;
  chainId: number;
  decimals: number;
  address: string;
  constructor(ApiRes: AssetsInterface) {
    let {
      asset,
      token_balance,
      estimated_balance,
      price,
      price_change_24h,
      contracts_balances,
    } = ApiRes;
    let { name, symbol, logo } = asset;
    this.name = name;
    this.chainId = 8453;
    this.symbol = symbol;
    this.logoURI = logo;
    this.userBalance = token_balance;
    this.quoteUSD = estimated_balance;
    this.price = price;
    this.price_change_24h = price_change_24h;
    this.decimals = contracts_balances[0].decimals;
    this.address = contracts_balances[0].address;
  }
}
