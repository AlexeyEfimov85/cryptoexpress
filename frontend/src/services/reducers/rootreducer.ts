import { combineReducers } from "redux";
import { getDataByDaysReducer } from "./getdatabydays";
import { countReducer } from "./countreducer";

export const rootReducer = combineReducers({
   getDataByDaysReducer,
   countReducer
})