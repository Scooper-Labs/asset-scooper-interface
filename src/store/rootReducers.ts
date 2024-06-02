import { combineReducers } from "redux";
import { ScooperApi } from "./ScooperAbi";
import { AuthSlice } from "./AuthSlice";

export default combineReducers({
   authReducer: AuthSlice.reducer,
  [ScooperApi.reducerPath]: ScooperApi.reducer,
});
