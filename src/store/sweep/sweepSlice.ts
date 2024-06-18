import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address } from "viem";
import { TokenInfo } from "@/components/TokenSelector/token-select-row";

interface SweepStateTypes {
  SelectedLowBalanceTokens: TokenInfo[]; //list of token selected to be swapped
  LowBalanceTokens: TokenInfo[]; //list of tokens considered as low balance
}
const initialState: SweepStateTypes = {
  SelectedLowBalanceTokens: [],
  LowBalanceTokens: [],
};

export const SweepTokensSlice = createSlice({
  name: "donationToken",
  initialState,
  reducers: {
    addLowBalanceToken: (state, action: PayloadAction<TokenInfo>) => {
      const lowBalanceSet = new Set(state.LowBalanceTokens);
      lowBalanceSet.add(action.payload);
      state.LowBalanceTokens = Array.from(lowBalanceSet);
    },
    removeLowBalanceToken: (state, action: PayloadAction<TokenInfo>) => {
      state.LowBalanceTokens = state.LowBalanceTokens.filter(
        (token) => token.address !== action.payload.address
      );
    },
    clearLowBalanceTokens: (state) => {
      state.LowBalanceTokens = [];
    },
  },
});

export const {} = SweepTokensSlice.actions;
export default SweepTokensSlice.reducer;
