// import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import CourcesSlice from "./CourcesSlice";
import FaqSlice from "./FaqSlice";
import NewsSlice from "./NewsSlice";
import CongratsSlice from "./CongratsSlice";
import BannerSlice from "./BannerSlice";
import TestimonialSlice from "./TestimonialSlice";
import WhoSlice from "./WhoSlice";
import HeaderSlice from "./HeaderSlice";
import CurrencySlice from "./CurrencySlice";
import FooterSlice from "./FooterSlice";
import CouponSlice from "./CouponSlice";
export default configureStore({
  reducer: {
    AuthSlice,
    CourcesSlice,
    FaqSlice,
    NewsSlice,
    BannerSlice,
    HeaderSlice,
    TestimonialSlice,
    FooterSlice,
    WhoSlice,
    CurrencySlice,
    CouponSlice,
    CongratsSlice
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
