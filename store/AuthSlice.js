import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const SignUp = createAsyncThunk(
  "Auth/SignUp",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/admin/signup`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
export const LoginReducer = createAsyncThunk(
  "Auth/LoginReducer",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/admin/login`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  });

export const LogOutReducer = createAsyncThunk("Auth/LogOutReducer", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/admin/logout`, {
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
// VerifyEmail
export const VerifyEmail = createAsyncThunk(
  "Auth/VerifyEmail",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/admin/forgot_password`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
export const changePassword = createAsyncThunk(
  "Auth/changePassword",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/admin/reset_password_email`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "Auth/updatePassword",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/admin/update_password`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Access-Token": Cookies.get("UT"),
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMesssage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMesssage);
    }
  }
);
export const VerifySignup = createAsyncThunk(
  "Auth/VerifySignup",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/admin/auth/verify`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
export const ReVerifySignup = createAsyncThunk(
  "Auth/ReVerifySignup",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/admin/auth/resendverify`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "Auth/getUserInfo",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .get(`${process.env.customKey}/admin/user`, {
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
  }
);
export const updateUserInfo = createAsyncThunk(
  "Auth/updateUserInfo",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/admin/user`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Access-Token": Cookies.get("UT"),
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
export const ContactReducer = createAsyncThunk(
  "Auth/ContactReducer",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/contact`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
export const subscribeReducer = createAsyncThunk(
  "Auth/subscribeReducer",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.customKey}/subscribe`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      const errMessage = err?.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
export const PayReducer = createAsyncThunk(
  "Auth/PayReducer",
  async (params, thunkAPI) => {
    const { course_id, coupon_details: coupon_code } = params;
    const { currency_code, currency_rate } = params.currentcurrency;

    console.log("HEREEE");

    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(
          `${process.env.customKey}/create-payment-intent`,
          {
            courseId: course_id,
            currency_code,
            currency_rate,
            coupon_code,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-Access-Token": Cookies.get("UT"),
            },
          }
        )
        .then((res) => res.data);
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  });
export const ConfirmPayCourse = createAsyncThunk("Auth/ConfirmPayCourse", async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .post(
        `${process.env.customKey}/course`,
        {
          courseId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Access-Token": Cookies.get("UT"),
          },
        }
      )
      .then((res) => res.data);
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});
const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    isAuthLoading: false,
    clientSecret: "",
    user_info: null,
  },
  reducers: {
    ClearSecret: (state, action) => {
      (state.clientSecret = ""), (state.user_info = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PayReducer.pending, (state, action) => {
        state.isHomeLoading = true;
        state.clientSecret = "";
      })
      .addCase(PayReducer.fulfilled, (state, action) => {
        state.isHomeLoading = false;
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(PayReducer.rejected, (state, action) => {
        state.isHomeLoading = false;
        state.clientSecret = "";
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.user_info = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user_info = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.user_info = null;
      });
  },
});
export const { ClearSecret } = AuthSlice.actions;

export default AuthSlice.reducer;
