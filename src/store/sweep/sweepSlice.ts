import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address } from "viem";
import { Token } from "@/lib/components/types";

interface SweepStateTypes {
  SelectedLowBalanceTokens: Token[]; //list of token selected to be swappedist of tokens considered as low balance
  userWalletTokens: Token[]; //current tokens in Userwallet
}
const initialState: SweepStateTypes = {
  SelectedLowBalanceTokens: [],
  userWalletTokens: [],
};

export const SweepTokensSlice = createSlice({
  name: "sweepTokenSlice",
  initialState,
  reducers: {
    setUserWalletTokenWithBalance: (state, action: PayloadAction<Token[]>) => {
      state.userWalletTokens = [];
      const tokenAddressSet = new Set();
      for (const token of action.payload) {
        if (!tokenAddressSet.has(token.address)) {
          state.userWalletTokens.push(token);
          tokenAddressSet.add(token.address);
        }
      }
    },
    selectToken: (state, action: PayloadAction<Token>) => {
      const tokenExists = state.SelectedLowBalanceTokens.some(
        (token) => token.address === action.payload.address,
      );
      if (!tokenExists) {
        state.SelectedLowBalanceTokens.push(action.payload);
      }
    },
    selectAllTokens: (state, action: PayloadAction<Token[]>) => {
      state.SelectedLowBalanceTokens = [];
      const tokenAddressSet = new Set();
      for (const token of action.payload) {
        if (!tokenAddressSet.has(token.address)) {
          state.SelectedLowBalanceTokens.push(token);
          tokenAddressSet.add(token.address);
        }
      }
    },

    unSelectToken: (state, action: PayloadAction<Token>) => {
      state.SelectedLowBalanceTokens = state.SelectedLowBalanceTokens.filter(
        (token) => token.address !== action.payload.address,
      );
    },
    clearAllSelectedTokens: (state) => {
      state.SelectedLowBalanceTokens = [];
    },
  },
});

export const {
  selectToken,
  unSelectToken,
  clearAllSelectedTokens,
  selectAllTokens,
  setUserWalletTokenWithBalance,
} = SweepTokensSlice.actions;
export default SweepTokensSlice.reducer;
