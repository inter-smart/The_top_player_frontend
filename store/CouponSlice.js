import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const applyCoupon = createAsyncThunk(
  "Coupon/apply_coupon",
  async (data, thunkAPI) => {
    const { coupon_code, courseAmount,currentCurrency } = data;
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${process.env.customKey}/apply_coupon`,
        { coupon_code, courseAmount,currentCurrency },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Access-Token": Cookies.get("UT"),
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err?.response?.data ? err?.response?.data?.error : "Server Error"
      );
    }
  }
);

const CouponSlice = createSlice({
  name: "Coupon",
  initialState: {
    coupon: null,
    coupon_details: null,
    initialLoading: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetCoupon: (state) => {
      state.coupon = null;
      state.coupon_details = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.coupon = action.payload.discountAmount;
        state.coupon_details = action.payload.couponExist;
        state.loading = false;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCoupon } = CouponSlice.actions;

export default CouponSlice.reducer;
