import { combineReducers } from "redux";
import { handleReducers } from "./productManagenment";
    // gom nhóm các reducers lại với nhau
  export const rootReducers = combineReducers({
    app: handleReducers
  })