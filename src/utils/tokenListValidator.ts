import { getAddress, isAddress } from 'viem'
import z from 'zod'



export const tokenListValidator = z.object({
    tokens: z.array(
      z.object({
        address: z
          .string()
          .transform((address) =>
            isAddress(address) && address === address.toLowerCase()
              ? getAddress(address)
              : address,
          ),
        chainId: z.number(),
        decimals: z.number(),
        name: z.string(),
        symbol: z.string(),
        logoUrl: z.string(),
      }),
    ),
  })
  