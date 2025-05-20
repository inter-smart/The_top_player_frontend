import Image from "next/legacy/image";
import styles from "/styles/NewsBox.module.scss";
import Link from "next/link";
import { t } from "i18next";
import { format } from "date-fns";
import { Button } from "react-bootstrap";

const NewsBox = ({ imageUrl, Lang, news }) => {
  // const length = news?.images?.length;
  // const randomIndex = length ? Math.floor(Math.random() * length) : 0;

  return (
    <div className={styles.newsBx}>
      <div className={styles.dElmt}>
        <Image
          src={"/images/news-dElmt-1.svg"}
          alt="dElmt"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.imgWrap}>
        <Image
          src={`${process.env.customKey}/newsCoverImages/${news?.coverimage}`}
          alt="news"
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
      </div>
      <div className={styles.cntWrap}>
        <div className={styles.tle}>
          {Lang === "ar" ? news?.title_ar : news?.title_en}{" "}
        </div>
        <div className={styles.txt}>
          {" "}
          {Lang === "ar" ? news?.description_ar : news?.description_en}{" "}
        </div>
        <div className={styles.info}>
          {" "}
          {t("news.postdate")} :{" "}
          {format(new Date(news?.createdAt), "dd MMMM yyyy")}
        </div>
        <Link
          href={"#news"}
          className={`${styles.vAllBtn} vAllBtn`}
          aria-label="view all button"
        >
          <span>{t("news.readmore")}</span>
          <span className="icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: Lang === "ar" ? "rotate(180deg)" : "rotate(0)",
              }}
            >
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
      <div className={`${styles.cntWrap} ${styles.dElmtcntWrap}`}>
        <div className={styles.tle}>
          {Lang === "ar" ? news?.title_ar : news?.title_en}{" "}
        </div>
        <div className={styles.txt}>
          {" "}
          {Lang === "ar" ? news?.description_ar : news?.description_en}{" "}
        </div>
        {/* <div className={styles.info}>{`Post Date : ${postDate}`}</div> */}
        <Link
          href={"#news"}
          className={`${styles.vAllBtn} vAllBtn`}
          aria-label="view all button"
        >
          <span>READ MORE</span>
          <span
            className="icon"
            style={{
              transform: Lang === "ar" ? "rotate(180deg)" : "rotate(0)",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
  );
};

NewsBox.defaultProps = {
  imageUrl: "/images/default-image.jpg",
};

export default NewsBox;
