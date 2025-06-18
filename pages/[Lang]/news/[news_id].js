import NewsBox from "@/components/layouts/NewsBox";
import styles from "/styles/News.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllNews, getNewsById } from "@/store/NewsSlice";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { t } from "i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import LangWrap from "@/components/layouts/LangWarp";
import LangChange from "@/components/layouts/LangChange";

import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

const NewsDetail = () => {
  const max_createdAt = "2024-11-01T14:49:49.000Z";

  const dispatch = useDispatch();
  const router = useRouter();
  const { news_id, Lang } = router.query;
  const { news } = useSelector((state) => state.NewsSlice.singleNews);
  const allnews = useSelector((state) => state.NewsSlice.allNews.news);

  useEffect(() => {
    if (news_id) {
      dispatch(getNewsById(news_id));
      dispatch(getAllNews(1));
    }
  }, [dispatch, news_id]);

  console.log("NEWS", news?.createdAt >= max_createdAt);

  return (
    <LangWrap Lang={Lang.toLowerCase()}>
      <LangChange Lang={Lang.toLowerCase()}>
        <div className={styles.inner_header_bg}></div>
        <section className={styles.news_detail_info}>
          <div className={`${styles.container} container`}>
            <div className={styles.news_tle}>
              <h2 className={styles.tle}>{t("Trending News")}</h2>
            </div>
            <div className={styles.d_flx}>
              <div className={styles.lft_sd}>
                {/* {news?.mobile?.map((item) => ( */}
                  <div key={news?.id} className={styles.img_wrap}>
                    <Image
                      src={`${process.env.customKey}/newsCoverImages/${news?.coverimage}`}
                      alt="news"
                      fill
                      sizes="420px"
                      objectFit="cover"
                    />
                  </div>
                {/* ))} */}
              </div>
              <div className={styles.rgt_sd}>
                <div className={styles.cnt_wrap}>
                  <div className={styles.delmt_bg}>
                    <Image
                      src={"/images/dElmt-countBg-1.svg"}
                      alt="bg"
                      width={640}
                      height={540}
                    />
                  </div>
                  <div className={styles.cnt_outer}>
                    <h2>{Lang === "ar" ? news?.title_ar : news?.title_en}</h2>
                    <div className={styles.info}>
                      {" "}
                      {t("news.postdate")} :{" "}
                      {news?.createdAt &&
                        format(new Date(news?.createdAt), "dd MMMM yyyy")}
                    </div>
                    <p>
                      {Lang === "ar"
                        ? news?.description_ar
                        : news?.description_en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.news_section}>
          <div className={`${styles.container} container`}>
            <div className={styles.news_tle}>
              <h2 className={styles.tle}>{t("news.recentnews")}</h2>
            </div>
            <Swiper
              dir={Lang === "ar" ? "rtl" : "ltr"}
              key={Lang}
              loop={false}
              spaceBetween={10}
              slidesPerView={1}
              pagination={false}
              navigation={true}
              initialSlide={1}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 2,
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
              {allnews &&
                allnews
                  ?.filter((item) => item.id != news_id)
                  ?.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  ?.slice(0, 3)
                  ?.map((news) => (
                    <SwiperSlide
                      key={news.id}
                      onClick={() => router.push(`/${Lang}/news/${news?.id}`)}
                    >
                      <NewsBox Lang={Lang} news={news} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </section>
      </LangChange>
    </LangWrap>
  );
};

export default NewsDetail;

export async function getServerSideProps({ req, params }) {
  try {
    const response = await axios.get(`${process.env.customKey}/news-image`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Access-Token": req.cookies.UT,
      },
    });

    const data = response.data.data;

    return {
      props: {
        banner: data[0],
        Lang: params.Lang.toLowerCase(),
        error: false,
        error_status: null,
      },
    };
  } catch (err) {
    return {
      props: {
        Lang: params.Lang.toLowerCase(),
        error: true,
        error_status: err?.response?.status,
        error_Text: err?.response?.data?.message || null,
      },
    };
  }
}
