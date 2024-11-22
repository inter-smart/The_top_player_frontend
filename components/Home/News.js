import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
// import { Pagination } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllNews } from "@/store/NewsSlice";
import { format } from "date-fns";
import NewsBox from "../layouts/NewsBox";
const News = ({ styles, Lang }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { allNews } = useSelector((state) => state.NewsSlice);

  useEffect(() => {
    dispatch(getAllNews(1));
  }, [dispatch]);

  return (
    <div className={styles.news_section} id={"news"}>
      <div className="container">
        <div className={styles.tleFlx}>
          <div className={`${styles.tleWrap} tleWrap`}>
            <h2 className={"mTle"}>{t("news.heading")}</h2>
          </div>
          <div className={styles.rgtSd}>
            <div className={styles.btnWrap}>
              <Link
                href={`/${Lang}/news/all_news`}
                className="vAllBtn"
                aria-label="view all button"
                style={{ textDecoration: "none" }}
              >
                <span>{t("news.viewall")}</span>
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
                        fill="#C7A27D"
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
        </div>

        <Swiper
          dir={Lang === "ar" ? "rtl" : "ltr"}
          key={"newsSwiper"}
          loop={true}
          spaceBetween={10}
          slidesPerView={1}
          pagination={false}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              // autoplay: false,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1551: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
          className={"newsSlide"}
        >
          {allNews?.news?.map((news) => (
            <SwiperSlide key={news?.id} onClick={() => router.push(`/${Lang}/news/${news?.id}`)}>
              <NewsBox news={news} Lang={Lang} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}
      </div>
    </div>
  );
};

export default News;
