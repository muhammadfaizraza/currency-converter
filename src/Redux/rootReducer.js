import { combineReducers } from "@reduxjs/toolkit";
import getCurrencies from "./Reducers/getCurrenciesReducer";
import convertCurrency from "./Reducers/convertCurrencyReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const convertCurrencyPersistConfig = {
  key: "convertCurrency",
  storage,
  whitelist: ["historyData"],
};
const rootReducer = combineReducers({
  getCurrencies: getCurrencies,
  convertCurrency: persistReducer(
    convertCurrencyPersistConfig,
    convertCurrency
  ),
});
export default rootReducer;
