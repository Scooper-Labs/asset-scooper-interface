import { formatEther } from "viem";
import {
  AssetsInterface,
  MoralisAssetInterface,
  TXN_Interface,
  WalletPortfolioApiResInterface,
} from "./interface";
import { getTime } from "./numberUtils";

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

export class BlockTransactions {
  blockNumber: number;
  wethIn: number;
  time: string;
  transactionHash: string;
  tokensIn: string[];
  amountsIn: string[];
  amountsOut: string[];

  constructor(txns: TXN_Interface[]) {
    const { blockNumber, blockTimestamp, transactionHash } = txns[0];
    this.blockNumber = parseInt(blockNumber);
    this.time = getTime(parseInt(blockTimestamp));
    this.transactionHash = transactionHash;
    this.tokensIn = txns.map((txn) => txn.tokenIn);
    this.amountsIn = txns.map((txn) => txn.amountIn);
    this.amountsOut = txns.map((txn) => formatEther(BigInt(txn.amountOut)));
    this.wethIn = txns.reduce(
      (acc, txn) => acc + parseInt(formatEther(BigInt(txn.amountOut))),
      0
    );
  }
}

export function groupTransactionsByBlock(
  txns: TXN_Interface[]
): BlockTransactions[] {
  const blockMap: { [blockNumber: string]: TXN_Interface[] } = {};

  // Group transactions by block number
  txns.forEach((txn) => {
    if (!blockMap[txn.blockNumber]) {
      blockMap[txn.blockNumber] = [];
    }
    blockMap[txn.blockNumber].push(txn);
  });

  // Create BlockTransactions for each group
  return Object.values(blockMap).map(
    (txnsInBlock) => new BlockTransactions(txnsInBlock)
  );
}

export class MoralisAssetClass {
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
  isEth: boolean;
  isSpam: boolean;
  constructor(ApiRes: MoralisAssetInterface) {
    let {
      name,
      symbol,
      logo,
      balance_formatted,
      usd_value,
      usd_price,
      usd_price_24hr_usd_change,
      decimals,
      token_address,
      native_token,
      possible_spam,
    } = ApiRes;
    this.name = name;
    this.chainId = 8453;
    this.symbol = symbol;
    this.logoURI = logo;
    this.userBalance = Number(balance_formatted);
    this.quoteUSD = usd_value;
    this.price = usd_price;
    this.price_change_24h = usd_price_24hr_usd_change;
    this.decimals = decimals;
    this.address = token_address;
    this.isEth = native_token;
    this.isSpam = possible_spam;
  }
}
