import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getAllTestimonials = createAsyncThunk("Testimonial/alltestimonials", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const result = await axios
      .get(`${process.env.customKey}/testimonial`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": Cookies.get("UT"),
        },
      })
      .then((res) => res.data);
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getTestimonialById = createAsyncThunk("Testimonial/testimonialById", async (testimonialId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const result = await axios
      .get(`${process.env.customKey}/testimonial/${testimonialId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": Cookies.get("UT"),
        },
      })
      .then((res) => res.data.testimonials);
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});

const TestimonialSlice = createSlice({
  name: "Testimonial",
  initialState: {
    initialloading: false,
    testimonials: [],
    testimonialById: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTestimonials.pending, (state, action) => {
      state.initialloading = true;
    });
    builder.addCase(getAllTestimonials.fulfilled, (state, action) => {
      state.testimonials = action.payload;
      state.initialloading = false;
    });
    builder.addCase(getAllTestimonials.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getTestimonialById.pending, (state, action) => {
      state.initialloading = true;
    });
    builder.addCase(getTestimonialById.fulfilled, (state, action) => {
      state.testimonialById = action.payload;
      state.initialloading = false;
    });
    builder.addCase(getTestimonialById.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default TestimonialSlice.reducer;
