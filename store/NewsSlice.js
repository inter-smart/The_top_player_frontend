import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllNews = createAsyncThunk(
  "News/allNews",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .get(`${process.env.customKey}/news/${data}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
        return result;
      } catch (err) {
        console.log(err);
        return rejectWithValue(err);
      }
    }
);

export const getNewsCount = createAsyncThunk(
  "News/count",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`${process.env.customKey}/news_count`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      
      return data
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getNewsById = createAsyncThunk(
  "News/newsById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .get(`${process.env.customKey}/news_by_id/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
        return result;
      } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const NewsSlice = createSlice({
  name: "News",
  initialState: {
    allNews: [],
    singleNews: [],
    count: 0,
    initialLoadng: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state, action) => {
        console.log("Pending");
        state.initialLoadng = true;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.allNews = action.payload;
        state.initialLoadng = false;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        console.log("Rejected");
        state.error = action.payload;
      })
      .addCase(getNewsCount.pending, (state, action) => {
        console.log("Pending");
        state.initialLoadng = true;
      })
      .addCase(getNewsCount.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.count = action.payload.count;
        state.initialLoadng = false;
      })
      .addCase(getNewsCount.rejected, (state, action) => {
        console.log("Rejected");
        state.error = action.payload;
      })
      .addCase(getNewsById.pending, (state, action) => {
        console.log("Pending");
        state.initialLoadng = true;
      })
      .addCase(getNewsById.fulfilled, (state, action) => {
        console.log("Fullfilled");
        state.singleNews = action.payload;
        state.initialLoadng = false;
      })
      .addCase(getNewsById.rejected, (state, action) => {
        console.log("rejected");
        state.initialLoadng = false;
        state.error = action.payload;
      });
  },
});

export default NewsSlice.reducer;
