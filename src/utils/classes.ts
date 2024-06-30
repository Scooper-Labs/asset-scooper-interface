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
export class TokenRowClass {
  name: string;
  symbol: string;
  logo: string;
  amount: number;
  value: number;
  wallets_holding: number;
  chains: string[];

  constructor(assets: AssetClass[]) {
    this.wallets_holding = assets.length;
    let { name, symbol, logo, blockchains } = assets[0];
    this.name = name;
    this.symbol = symbol;
    this.logo = logo;
    this.chains = blockchains;
    let [amount, value] = [0, 0];
    assets.forEach((asset) => {
      amount += asset.token_balance;
      value += asset.estimated_balance;
    });
    this.amount = amount;
    this.value = value;
  }
}
export class SpecificTokenRowClass {
  // tokenRow: TokenRowClass
  // wallet: string
  // cross_chain_balances: { [blockchain: string]: number }

  constructor(data: WalletPortfolioClass[], token: string) {
    // Get wallets with assets of the token
    let wallets = data.filter((wallet) =>
      wallet.assets.some((asset) => asset.name.toLowerCase() === token)
    );
  }
}
export class AssetClass {
  name: string;
  symbol: string;
  logo: string;
  blockchains: string[];
  token_balance: number;
  estimated_balance: number;
  cross_chain_balances;
  price: number;
  price_change_24h: number;
  constructor(ApiRes: AssetsInterface) {
    let {
      asset,
      token_balance,
      estimated_balance,
      cross_chain_balances,
      price,
      price_change_24h,
    } = ApiRes;
    let { name, symbol, logo } = asset;
    this.name = name;
    this.symbol = symbol;
    this.logo = logo;
    this.token_balance = token_balance;
    this.estimated_balance = estimated_balance;
    this.blockchains = Object.entries(cross_chain_balances).map((entry) =>
      entry[0].toLowerCase()
    );
    this.cross_chain_balances = cross_chain_balances;
    this.price = price;
    this.price_change_24h = price_change_24h;
  }
}
export class TokenRowComponent {
  tokenRows: TokenRowClass[];
  constructor(tokens: TokenRowClass[]) {
    this.tokenRows = tokens;
  }

  public show_all_tokens() {
    return this.tokenRows;
  }

  public show_token_by_chain(chain: string) {
    return this.tokenRows.filter((token) =>
      token.chains.includes(chain.toLowerCase())
    );
  }

  public show_tokens_greater_than_1() {
    return this.tokenRows.filter((token) => token.value >= 1);
  }
}
interface WalletDetails {
  chain: string;
  amount: number;
  value: number;
}
type Wallet = Record<string, WalletDetails>;
export class TokensPageClass {
  name: string;
  symbol: string;
  price: number;
  price_change_24h: number;
  logo: string;
  chains: string[];
  total_token_value: number;
  total_token_amount: number;
  wallets: string[];
  wallet: { [x: string]: WalletDetails[] }[];
  constructor(data: [string, AssetClass[]][]) {
    let { name, symbol, price, price_change_24h, logo } = data[0][1][0];
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.price_change_24h = price_change_24h;
    this.logo = logo;
    this.wallets = data.map((entry) => entry[0]);
    this.chains = (() => {
      let _chains = data.flatMap((entry) =>
        entry[1].flatMap((asset) => asset.blockchains)
      );
      _chains = Array.from(new Set(_chains));
      return _chains;
    })();
    this.total_token_value = data.reduce((acc, entry) => {
      let [, assets] = entry;
      return (
        acc + assets.reduce((acc, asset) => acc + asset.estimated_balance, 0)
      );
    }, 0);
    this.total_token_amount = data.reduce((acc, entry) => {
      let [, assets] = entry;
      return acc + assets.reduce((acc, asset) => acc + asset.token_balance, 0);
    }, 0);
    this.wallet = data.map(([wallet, assets]) => {
      let chains = assets.reduce((acc: Wallet, asset) => {
        asset.blockchains.forEach((chain) => {
          if (!acc[chain]) {
            acc[chain] = { chain, amount: 0, value: 0 };
          }
          acc[chain].amount += asset.token_balance;
          acc[chain].value += asset.estimated_balance;
        });
        return acc;
      }, {});

      return {
        [wallet]: Object.values(chains),
      };
    });
  }
}
