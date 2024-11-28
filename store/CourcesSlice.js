import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getPayments = createAsyncThunk("Cources/getPayments", async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/payments`, {
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
export const getCources = createAsyncThunk("Cources/getCources", async (id, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/course/${id}`, {
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
export const getSubCources = createAsyncThunk("Cources/getSubCources", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/subcourse/${data.courseId}/${data.sucourseId}`, {
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
export const getsubscribedCourse = createAsyncThunk("Cources/getsubscribedCourse", async (token, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/subscribedCourse`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": token ? token : Cookies.get("UT"),
        },
      })
      .then((res) => {
        return res.data;
      });
    return result;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message);
  }
});
export const getMyPrograms = createAsyncThunk("Cources/getMyPrograms", async (token, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/my_courses`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": token ? token : Cookies.get("UT"),
        },
      })
      .then((res) => {
        return res.data;
      });
    return result;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message);
  }
});
export const checkToken = createAsyncThunk("Cources/checkToken", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/subscribedCourse`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": data,
        },
      })
      .then((res) => res.data);
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const videos_in_days = createAsyncThunk("Cources/videos_in_days", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/videos/${data.courseId}/${data.subCourseId}/${data.day}/${data.week}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": Cookies.get("UT"),
          // params: data,
        },
      })
      .then((res) => res.data);
    console.log("videos_in_days", result);

    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getVideo = createAsyncThunk("Cources/getVideo", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/video/${data.videoId}/${data.courseId}/${Cookies.get("UT")}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "X-Access-Token": Cookies.get("UT"),
          // params: data,
        },
      })
      .then((res) => res.data);
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});
export const watchedVideo = createAsyncThunk("Cources/watchedVideo", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .post(`${process.env.customKey}/video`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": Cookies.get("UT"),
          // params: data,
        },
      })
      .then((res) => res.data);
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});
export const allCourses = createAsyncThunk("Cources/allCourses", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/courses`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": Cookies.get("UT"),
        },
      })
      .then((res) => {
        return res.data;
      });
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const courseById = createAsyncThunk("Cources/courseById", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const result = await axios
      .get(`${process.env.customKey}/courseById/${data}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": Cookies.get("UT"),
        },
      })
      .then((res) => {
        return res.data.course;
      });
    return result;
  } catch (err) {
    return rejectWithValue(err);
  }
});

const CourcesSlice = createSlice({
  name: "Cources",
  initialState: {
    isCourcesLoading: false,
    CoursecArr: null,
    SubCourse: null,
    subscribedCourseArr: null,
    videos: null,
    Curreent_video: null,
    CourseById: null,
    myPrograms: null,
  },
  reducers: {
    ClearToken: (state, action) => {
      state.subscribedCourseArr = null;
      state.CoursecArr = null;
      state.videos = null;
      state.Curreent_video = null;
      state.SubCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCources.pending, (state, action) => {
        state.isCourcesLoading = true;
        state.CoursecArr = null;
      })
      .addCase(getCources.fulfilled, (state, action) => {
        state.isCourcesLoading = false;
        state.CoursecArr = action.payload;
      })
      .addCase(getCources.rejected, (state, action) => {
        state.isCourcesLoading = false;
        state.CoursecArr = null;
      })
      .addCase(allCourses.pending, (state, action) => {
        state.isCourcesLoading = true;
        state.CoursecArr = null;
      })
      .addCase(allCourses.fulfilled, (state, action) => {
        state.isCourcesLoading = false;
        state.CoursecArr = action.payload;
      })
      .addCase(allCourses.rejected, (state, action) => {
        state.isCourcesLoading = false;
        state.CoursecArr = null;
      })
      .addCase(getSubCources.pending, (state, action) => {
        state.isCourcesLoading = true;
        state.SubCourse = null;
      })
      .addCase(getSubCources.fulfilled, (state, action) => {
        state.isCourcesLoading = false;
        state.SubCourse = action.payload;
      })
      .addCase(getSubCources.rejected, (state, action) => {
        state.isCourcesLoading = false;
        state.SubCourse = null;
      })
      .addCase(getsubscribedCourse.pending, (state, action) => {
        state.isCourcesLoading = true;
      })
      .addCase(getsubscribedCourse.fulfilled, (state, action) => {
        state.isCourcesLoading = false;
        state.subscribedCourseArr = action.payload;
      })
      .addCase(getsubscribedCourse.rejected, (state, action) => {
        state.isCourcesLoading = false;
        state.subscribedCourseArr = null;
      })
      .addCase(videos_in_days.pending, (state, action) => {
        state.allVideoLoading = true;
        state.videos = null;
      })
      .addCase(videos_in_days.fulfilled, (state, action) => {
        state.allVideoLoading = false;
        state.videos = action.payload;
      })
      .addCase(videos_in_days.rejected, (state, action) => {
        state.videos = null;
        state.allVideoLoading = false;
      })
      .addCase(getVideo.pending, (state, action) => {
        state.isCourcesLoading = true;
        state.Curreent_video = null;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.isCourcesLoading = false;
        state.Curreent_video = action.payload;
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.Curreent_video = null;
      })
      .addCase(courseById.pending, (state, action) => {
        state.isCourcesLoading = true;
        state.CourseById = null;
      })
      .addCase(courseById.fulfilled, (state, action) => {
        state.isCourcesLoading = false;
        state.CourseById = action.payload;
      })
      .addCase(courseById.rejected, (state, action) => {
        state.isCourcesLoading = false;
        state.CourseById = null;
      })
      .addCase(getMyPrograms.pending, (state, action) => {
        state.isCourcesLoading = true;
        state.myPrograms = null;
      })
      .addCase(getMyPrograms.fulfilled, (state, action) => {
        state.isCourcesLoading = false;
        state.myPrograms = action.payload.data;
      })
      .addCase(getMyPrograms.rejected, (state, action) => {
        state.isCourcesLoading = false;
        state.myPrograms = null;
      });
  },
});
export const { ClearToken } = CourcesSlice.actions;

export default CourcesSlice.reducer;
