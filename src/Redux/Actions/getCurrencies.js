import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrenciesFailure,
  getCurrenciesStart,
  getCurrenciesSuccess,
} from "../Reducers/getCurrenciesReducer";
import axios from "axios";
export const getCurrencies = createAsyncThunk("auth", async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(getCurrenciesStart());

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}getCurrency`
    );
    const responseData = await response;

    thunkAPI.dispatch(getCurrenciesSuccess(responseData));

    return responseData;
  } catch (error) {
    thunkAPI.dispatch(getCurrenciesFailure(error.response.data.message));
    throw error;
  }
});
