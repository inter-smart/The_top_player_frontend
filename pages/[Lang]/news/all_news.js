import NewsBox from "@/components/layouts/NewsBox";
import InnerBanner from "/components/layouts/InnerBanner";
import styles from "/styles/News.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllNews, getNewsCount } from "@/store/NewsSlice";
import { t } from "i18next";
import LangWrap from "@/components/layouts/LangWarp";
import LangChange from "@/components/layouts/LangChange";
import axios from "axios";
const News = ({ banner }) => {
  const { banner_text, banner_text_ar } = banner;

  const router = useRouter();
  const { Lang } = router.query;

  const [dataCount, setDataCount] = useState(1);

  const dispatch = useDispatch();
  const { allNews, count } = useSelector((state) => state.NewsSlice);
  useEffect(() => {
    dispatch(getNewsCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllNews(dataCount));
  }, [dispatch, dataCount]);

  const handleNavigate = (id) => {
    router.push(`/${Lang}/news/${id}`);
  };

  const handleLoadMore = () => {
    setDataCount((prev) => prev + 1);
  };

  return (
    <LangWrap Lang={Lang.toLowerCase()}>
      <LangChange Lang={Lang.toLowerCase()}>
        <div className={styles.program_page}>
          {banner ? (
            <InnerBanner
              imageUrl={`${process.env.customKey}/news-banner-images/${banner?.imageUrl}`}
              title={banner_text}
              title_ar={banner_text_ar}
              Lang={Lang}
            />
          ) : (
            <InnerBanner
              imageUrl={"/images/banner-news.jpg"}
              title={"Trending news"}
              title_ar={"آخر الحصريات"}
              Lang={Lang}
            />
          )}

          <div className={styles.news_list_section}>
            <div className={"container"}>
              <div className={`${styles.tleWrap} tleWrap`}>
                {/* <h2 className={"mTle"}>{t("news.heading")}</h2> */}
              </div>
              <div className={styles.dFlx}>
                {allNews?.news?.map((news) => (
                  <div
                    key={news?.id}
                    className={styles.item}
                    onClick={(e) => handleNavigate(news.id)}
                  >
                    <NewsBox news={news} Lang={Lang} />
                  </div>
                ))}
              </div>
              <div className={styles.btnWrap}>
                <button
                  className={`${styles.baseBtn} baseBtn hoveranim`}
                  aria-label="button"
                  disabled={allNews?.news?.length === count}
                  onClick={handleLoadMore}
                >
                  <span>
                    {allNews?.news?.length === count
                      ? t("news.finished")
                      : t("news.loadmore")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </LangChange>
    </LangWrap>
  );
};

export default News;

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
    //console.log(err);
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
