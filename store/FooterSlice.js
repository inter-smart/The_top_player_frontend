import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getFooter = createAsyncThunk(
  "Footer/footercontents",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .get(`${process.env.customKey}/footer`, {
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

const FooterSlice = createSlice({
  name: "Footer",
  initialState: {
    initialloading: false,
    footer: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFooter.pending, (state, action) => {
      state.initialloading = true;
    });
    builder.addCase(getFooter.fulfilled, (state, action) => {
      state.footer = action.payload.data;
      state.initialloading = false;
    });
    builder.addCase(getFooter.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default FooterSlice.reducer;
