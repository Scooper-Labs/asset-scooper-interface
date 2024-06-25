import { combineReducers } from "redux";
import { ScooperApi } from "./ScooperAbi";
import { AuthSlice } from "./AuthSlice";
import { SweepTokensSlice } from "./sweep/sweepSlice";


export default combineReducers({
  authReducer: AuthSlice.reducer,
  [ScooperApi.reducerPath]: ScooperApi.reducer,
  SweepTokensSlice: SweepTokensSlice.reducer,
});
