import { combineReducers } from "redux";

import { AssetScooperApi } from "./assetScooperApi";

export default combineReducers({
  [AssetScooperApi.reducerPath]: AssetScooperApi.reducer,
});
