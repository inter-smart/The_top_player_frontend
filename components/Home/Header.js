import { getHeaderBanner } from "@/store/HeaderSlice";
import Aos from "aos";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ styles, Lang }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    Aos.init({ duration: 900 });
  }, []);





  return (
    <div className={styles.banner_section} id="banner">
      <div className={styles.banner_info}>
        {/* <h1>{Lang === "ar" ? state?.head_ar : state?.head}</h1>
        <h2>{Lang === "ar" ? state?.subhead_ar : state?.subhead}</h2>
        <p>{Lang === "ar" ? state?.title_text_Ar : state?.title_text}</p> */}
        <div className={styles.btn_wrap}>
          <Link href={`/${Lang}#programs`} className="baseBtn hoveranim" aria-label={t("yalla")} style={{textDecoration:"none"}}>
            <span>{t("yalla")}</span>
            <span
              className="icon"
              style={{
                transform: Lang === "ar" ? "rotate(180deg)" : "rotate(0)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2016_70)">
                  <path
                    d="M11 0C4.9344 0 0 4.9344 0 11C0 17.0656 4.9344 22 11 22C17.0656 22 22 17.0656 22 11C22 4.9344 17.0656 0 11 0ZM14.3981 11.6481L9.81475 16.2314C9.636 16.4102 9.40135 16.5 9.16665 16.5C8.932 16.5 8.6973 16.4102 8.51855 16.2314C8.16015 15.873 8.16015 15.2937 8.51855 14.9353L12.4538 11L8.5186 7.06475C8.1602 6.70635 8.1602 6.127 8.5186 5.7686C8.877 5.4102 9.45635 5.4102 9.81475 5.7686L14.3981 10.3519C14.7565 10.7103 14.7565 11.2897 14.3981 11.6481Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2016_70">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.image_header}>

        <video
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-label="Video player"
        >
          <source
            // src="https://backend.thetopplayer.com/videos/header.mp4"
            src={`${process.env.customKey}/banner_videos/${state.videoUrl}`}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default Header;
