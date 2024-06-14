import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Address } from "viem";
import { TokenInfo } from "@/components/TokenSelector/token-select-row";

interface SweepStateTypes {
  SelectedTokens: TokenInfo[];
  LowBalanceTokens: TokenInfo[];
}
const initialState: SweepStateTypes = {
  SelectedTokens: [],
  LowBalanceTokens: [],
};

export const SweepTokensSlice = createSlice({
  name: "donationToken",
  initialState,
  reducers: {
  

  },
});

export const {  } = SweepTokensSlice.actions;
export default SweepTokensSlice.reducer;
