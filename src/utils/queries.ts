import { gql } from "@apollo/client";

export const GET_ACCOUNT_TX = gql`
  query MyQuery($address: Bytes!) {
    tokenSwappeds(where: { user: $address }) {
      tokenIn
      amountIn
      amountOut
      transactionHash
      blockTimestamp
      blockNumber
    }
  }
`;
