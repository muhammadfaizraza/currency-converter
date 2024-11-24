import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const getCurrenciesSlice = createSlice({
  name: "getCurrencies",
  initialState,
  reducers: {
    getCurrenciesStart(state, payload) {
      state.loading = true;
      state.error = null;
    },
    getCurrenciesSuccess(state, action) {
      state.loading = false;
      state.data = action.payload.data;
    },
    getCurrenciesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCurrenciesStart,
  getCurrenciesSuccess,
  getCurrenciesFailure,
  clearState,
} = getCurrenciesSlice.actions;

export default getCurrenciesSlice.reducer;
