import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
  data: "",
  historyData: [],
};

const convertCurrencySlice = createSlice({
  name: "convertCurrency",
  initialState,
  reducers: {
    convertCurrencyStart(state, payload) {
      state.loading = true;
      state.error = null;
    },
    convertCurrencySuccess(state, action) {
      state.loading = false;
      state.data = action.payload.data;
      state.success = "Data fetched";
    },
    saveConvertedHistory(state, action) {
      const updatedHistory = [...state.historyData, action.payload];

      state.historyData = updatedHistory;
    },

    convertCurrencyFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  convertCurrencyStart,
  convertCurrencySuccess,
  saveConvertedHistory,
  convertCurrencyFailure,
  clearState,
} = convertCurrencySlice.actions;

export default convertCurrencySlice.reducer;
