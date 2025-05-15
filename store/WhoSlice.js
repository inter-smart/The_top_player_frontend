import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCounts = createAsyncThunk(
  "Count/allCounts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const result = await axios
        .get(`${process.env.customKey}/who_are_we_data`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const WhoSlice = createSlice({
  name: "Counts",
  initialState: {
    initialloading: false,
    counts: [],
    unit: null,
    count:null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCounts.pending, (state, action) => {
      state.initialloading = true;
    });
    builder.addCase(getCounts.fulfilled, (state, action) => {
      state.counts = action.payload.data;
      state.count = action.payload.counts;
      state.unit = action.payload.units;
      state.initialloading = false;
    });
    builder.addCase(getCounts.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default WhoSlice.reducer;
