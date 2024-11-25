import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getCongratsData = createAsyncThunk(
  "Congrats/allCongrats",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .get(`${process.env.customKey}/congrats-box`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Access-token": Cookies.get("UT"),
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const CongratsSlice = createSlice({
  name: "Congrats",
  initialState: {
    initialloading: false,
    congrats: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCongratsData.pending, (state, action) => {
      state.initialloading = true;
    });
    builder.addCase(getCongratsData.fulfilled, (state, action) => {
      state.congrats = action.payload.data[0];
      state.initialloading = false;
    });
    builder.addCase(getCongratsData.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default CongratsSlice.reducer;
