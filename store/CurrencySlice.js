import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const detectUserCountryCode = async () => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return response.data.country_code; // Default to 'US' if country code is not available
  } catch (error) {
    console.error("Error fetching the country code:", error);
    return "US"; // Default to 'US' in case of an error
  }
};

export const getAllCurrencies = createAsyncThunk(
  "Currency/all",
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    try {
      const result = await axios
        .get(`${process.env.customKey}/currency`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      dispatch(initializeCurrencyCode());
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const initializeCurrencyCode = createAsyncThunk(
  "currency/initialize",
  async () => {
    const countryCode = await detectUserCountryCode();
    return countryCode;
  }
);

const CurrencySlice = createSlice({
  name: "Currency",
  initialState: {
    initialloading: false,
    currencyloading: false,
    currencies: [],
    currentcurrency: null,
    error: null,
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currentcurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCurrencies.pending, (state, action) => {
        state.initialloading = true;
      })
      .addCase(getAllCurrencies.fulfilled, (state, action) => {
        state.currencies = action.payload.data;
        state.currentcurrency = state.currencies[0];
        state.initialloading = false;
      })
      .addCase(getAllCurrencies.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(initializeCurrencyCode.pending, (state, action) => {
        state.currencyloading = true;
        // Default to 'US' if initialization fails
      })
      .addCase(initializeCurrencyCode.fulfilled, (state, action) => {
        let currentLocation = action.payload;
        // let currentLocation = "AE";
        let allCountries = state.currencies;

        const matchingCountry = allCountries.find(
          (item) => item.currency_flag == currentLocation
        );
        if (matchingCountry) {
          state.currentcurrency = matchingCountry;
        } else {
          state.currentcurrency = allCountries.find(
            (item) => item.currency_code == "USD"
          );
        }
        state.currencyloading = false;
      })

      .addCase(initializeCurrencyCode.rejected, (state, action) => {
        state.currentcurrency = "USD"; // Default to 'US' if initialization fails
      });
  },
});
export const { setCurrency } = CurrencySlice.actions;
export default CurrencySlice.reducer;
