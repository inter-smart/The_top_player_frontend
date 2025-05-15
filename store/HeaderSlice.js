import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getHeaderBanner = createAsyncThunk(
  "Header/banners",
  async (_, thunkAPI) => {
    const { rejectWithValue} = thunkAPI;
     
    try {
      const result = await axios
        .get(`${process.env.customKey}/main_banner`, {
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

const HeaderSlice = createSlice({
  name: "Header",
  initialState: {
    initialloading: false,
    banners: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHeaderBanner.pending, (state, action) => {
      state.initialloading = true;
    });
    builder.addCase(getHeaderBanner.fulfilled, (state, action) => {
      state.banners = action.payload.data;
      state.initialloading = false;
    });
    builder.addCase(getHeaderBanner.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default HeaderSlice.reducer;
