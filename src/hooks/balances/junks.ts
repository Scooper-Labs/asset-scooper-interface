import { formatUnits } from "viem";
import { z } from "zod";
const logoUrlsSchema = z.object({
    token_logo_url: z.string(),
    protocol_logo_url: z.string(),
    chain_logo_url: z.string(),
  });
  const protocolMetadataSchema = z.object({
    protocol_name: z.string(),
  });
  const nftCollectionAttributeSchema = z.object({
    trait_type: z.string(),
    value: z.string(),
  });
  const nftExternalDataV1Schema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    image_256: z.string(),
    image_512: z.string(),
    image_1024: z.string(),
    animation_url: z.string(),
    external_url: z.string(),
    attributes: z.array(nftCollectionAttributeSchema),
    owner: z.string(),
  });
  
  const balanceNftDataSchema = z.object({
    token_id: z.bigint().nullable(),
    token_balance: z.bigint().nullable(),
    token_url: z.string(),
    supports_erc: z.array(z.string()),
    token_price_wei: z.bigint().nullable(),
    token_quote_rate_eth: z.string(),
    original_owner: z.string(),
    external_data: nftExternalDataV1Schema, // Replace with the actual schema if needed
    owner: z.string(),
    owner_address: z.string(),
    burned: z.boolean(),
  });
  // Define the schema for BalanceItem
  const balanceItemSchema = z.object({
    contract_decimals: z.number(),
    contract_name: z.string(),
    contract_ticker_symbol: z.string(),
    contract_address: z.string(),
    contract_display_name: z.string(),
    supports_erc: z.array(z.string()),
    logo_url: z.string(),
    logo_urls: logoUrlsSchema,
    last_transferred_at: z.date().nullable(),
    native_token: z.boolean(),
    type: z.string(),
    is_spam: z.boolean(),
    balance: z.bigint().nullable(),
    balance_24h: z.bigint().nullable(),
    quote_rate: z.number(),
    quote_rate_24h: z.number(),
    quote: z.number(),
    quote_24h: z.number(),
    pretty_quote: z.string(),
    pretty_quote_24h: z.string(),
    protocol_metadata: protocolMetadataSchema,
    nft_data: balanceNftDataSchema,
  });
  
  const balancesResponseSchema = z.object({
    address: z.string(),
    chain_id: z.number(),
    chain_name: z.string(),
    quote_currency: z.string(),
    updated_at: z.date(),
    items: z.array(balanceItemSchema),
  });

  const validatedData = balancesResponseSchema.transform((data) => ({
    ...data,
    items: data.items.map((item) => ({
      address: item.contract_address,
      chainId: data.chain_id,
      decimals: item.contract_decimals,
      logoURI: item.logo_url || "",
      name: item.contract_name,
      symbol: item.contract_ticker_symbol,
      quoteUSD: item.pretty_quote,
      userBalance: item.balance
        ? Number(formatUnits(item.balance ?? 0n, 18))
        : 0,
    })),
  }));