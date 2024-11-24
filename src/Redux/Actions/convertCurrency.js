import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  convertCurrencyFailure,
  convertCurrencyStart,
  convertCurrencySuccess,
  saveConvertedHistory,
} from "../Reducers/convertCurrencyReducer.js";
import axios from "axios";
export const convertCurrency = createAsyncThunk(
  "auth",
  async ({ conversionRecord }, thunkAPI) => {
    try {
      thunkAPI.dispatch(convertCurrencyStart());

      const queryParams = {
        ...(conversionRecord && { baseCurrency: conversionRecord.from }),
        ...(conversionRecord && { targetCurrency: conversionRecord.to }),
        ...(conversionRecord && { amount: conversionRecord.amount }),
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}convert`,
        {
          params: queryParams,
        }
      );
      const responseData = await response;

      conversionRecord.convertedAmount = response?.data?.convertedAmount;
      thunkAPI.dispatch(convertCurrencySuccess(responseData));
      thunkAPI.dispatch(saveConvertedHistory(conversionRecord));
      return responseData;
    } catch (error) {
      thunkAPI.dispatch(convertCurrencyFailure(error.response.data.message));
      throw error;
    }
  }
);
