import Image from "next/legacy/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Program.module.scss";
import Cookies from "js-cookie";
import LangWrap from "../layouts/LangWarp";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Coupon from "../layouts/Coupon";

const ProgramCard = ({ Lang, programDetails, programsId, expired, isLoggedIn, onTriggerScroll }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const currentPath = router.pathname;
  const wordToCheck = "camps";
  const regex = new RegExp(`\\b${wordToCheck}\\b`);

  const { currentcurrency } = useSelector((state) => state.CurrencySlice);

  const handleRedirect = (type) => {
    if (isLoggedIn && type === "free") {
      onTriggerScroll();
      return;
    }

    const isFree = type === "free";
    const isTamaraPath = regex.test(currentPath);

    const hasUTCookie = Cookies.get("UT");
    const userPath = isFree
      ? `/${Lang}/user/${isTamaraPath ? "camps" : "programs"}/details/${programsId}`
      : `/${Lang}/user/payment/${isTamaraPath ? "tamara/" : ""}${programsId}`;
    const adminLoginPath = `/${Lang}/auth/login`;

    if (hasUTCookie) {
      router.push(userPath);
    } else {
      sessionStorage.setItem(isTamaraPath ? "tamaraId" : "courseId", programsId);
      if (isFree) {
        sessionStorage.setItem("isFree", "true");
        sessionStorage.setItem("subId", process.env.FREE_SUB_ID);
      }
      router.push(adminLoginPath);
    }
  };

  return (
    // <LangWrap Lang={Lang}>
    <div className={styles.fitness_section}>
      <div className={"container"}>
        <div className={styles.program_bx}>
          <div className={styles.tamara_icon}>
            <img src="/images/tamara_ribbon.png" alt="fitness" loading="lazy" />
          </div>
          <div className={styles.lftSd}>
            <div className={styles.cntWrap}>
              <div className={"tleWrap"}>
                <h2 className={"mTle"}>{Lang === "en" ? programDetails?.name : programDetails?.name_arabic}</h2>
                {/* <div className={"sTle"}>{t("programs_details.contain")}</div> */}
              </div>
              <div className={styles.list_bx}>
                {
                  <ul
                    className={`${Lang === "ar" ? styles.ar : styles.en}`}
                    dangerouslySetInnerHTML={{
                      __html: Lang === "ar" ? programDetails?.descriptionHTMLAr : programDetails?.descriptionHTML,
                    }}
                  ></ul>
                }
              </div>
              <div className={styles.btnWrap}>
                <>
                  <button
                    onClick={() => handleRedirect("join")}
                    disabled={programDetails?.isFull}
                    className={programDetails?.isFull ? "baseBtn" : "baseBtn hoveranim"}
                    aria-label="view all button"
                  >
                    {programDetails?.isFull ? (
                      <span>{programDetails?.isFull ? t("camp_full") : t("join_now")}</span>
                    ) : (
                      <span>{expired ? t("renew") : t("join_now")}</span>
                    )}
                    <span
                      className={"icon"}
                      style={{
                        transform: Lang === "ar" ? "rotate(180deg)" : "rotate(0)",
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2016_70)">
                          <path
                            d="M11 0C4.9344 0 0 4.9344 0 11C0 17.0656 4.9344 22 11 22C17.0656 22 22 17.0656 22 11C22 4.9344 17.0656 0 11 0ZM14.3981 11.6481L9.81475 16.2314C9.636 16.4102 9.40135 16.5 9.16665 16.5C8.932 16.5 8.6973 16.4102 8.51855 16.2314C8.16015 15.873 8.16015 15.2937 8.51855 14.9353L12.4538 11L8.5186 7.06475C8.1602 6.70635 8.1602 6.127 8.5186 5.7686C8.877 5.4102 9.45635 5.4102 9.81475 5.7686L14.3981 10.3519C14.7565 10.7103 14.7565 11.2897 14.3981 11.6481Z"
                            fill="white"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_2016_70">
                            <rect width="22" height="22" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </button>
                  {programDetails?.id === process.env.FREE_COURSE_ID && !expired && (
                    <button onClick={() => handleRedirect("free")} className="baseBtn hoveranim" aria-label="view all button">
                      <span>{t("programs.free_trial")}</span>
                      <span
                        className={"icon"}
                        style={{
                          transform: Lang === "ar" ? "rotate(180deg)" : "rotate(0)",
                        }}
                      >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_2016_70)">
                            <path
                              d="M11 0C4.9344 0 0 4.9344 0 11C0 17.0656 4.9344 22 11 22C17.0656 22 22 17.0656 22 11C22 4.9344 17.0656 0 11 0ZM14.3981 11.6481L9.81475 16.2314C9.636 16.4102 9.40135 16.5 9.16665 16.5C8.932 16.5 8.6973 16.4102 8.51855 16.2314C8.16015 15.873 8.16015 15.2937 8.51855 14.9353L12.4538 11L8.5186 7.06475C8.1602 6.70635 8.1602 6.127 8.5186 5.7686C8.877 5.4102 9.45635 5.4102 9.81475 5.7686L14.3981 10.3519C14.7565 10.7103 14.7565 11.2897 14.3981 11.6481Z"
                              fill="white"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_2016_70">
                              <rect width="22" height="22" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </button>
                  )}
                </>

                {/* {CoursecArr && (
                  <button className={"baseBtn hoveranim"} disabled={expired ? false : true} onClick={() => handleRedirect("join")}>
                    <span>{t(expired ? "renew" : "yalla")}</span>
                    <span className={"icon"}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_2016_70)">
                          <path
                            d="M11 0C4.9344 0 0 4.9344 0 11C0 17.0656 4.9344 22 11 22C17.0656 22 22 17.0656 22 11C22 4.9344 17.0656 0 11 0ZM14.3981 11.6481L9.81475 16.2314C9.636 16.4102 9.40135 16.5 9.16665 16.5C8.932 16.5 8.6973 16.4102 8.51855 16.2314C8.16015 15.873 8.16015 15.2937 8.51855 14.9353L12.4538 11L8.5186 7.06475C8.1602 6.70635 8.1602 6.127 8.5186 5.7686C8.877 5.4102 9.45635 5.4102 9.81475 5.7686L14.3981 10.3519C14.7565 10.7103 14.7565 11.2897 14.3981 11.6481Z"
                            fill="white"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_2016_70">
                            <rect width="22" height="22" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </button>
                )} */}
              </div>
            </div>
          </div>

          <div className={styles.rgtSd}>
            <div className={styles.img_outer}>
              {programDetails?.offerPercentage && (
                <div className={styles.info_offer}>
                  <span>
                    {programDetails?.offerPercentage}
                    <span className={styles.sm}>%</span> <br />
                    <span className={styles.sm}>OFF</span>
                  </span>
                </div>
              )}
              <div className={styles.img_wrap}>
                <Image
                  src={`${process.env.customKey}/courseImages/${programDetails?.imageUrl}`}
                  alt="fitness"
                  width={380}
                  height={520}
                  layout="responsive"
                  objectFit="contain"
                  loading="lazy"
                />
              </div>
              <div className={`${styles.info_price} dir-lft`}>
                <span>
                  {" "}
                  <sup>{currentcurrency && currentcurrency?.currency_code}</sup>
                  {(programDetails?.offerAmount * currentcurrency?.currency_rate).toFixed(2)}
                </span>
                {programDetails?.offerPercentage && (
                  <span className={styles.old_price}>
                    <sup>{currentcurrency && currentcurrency?.currency_code}</sup>
                    <span>{(programDetails?.amount * currentcurrency?.currency_rate).toFixed(2)}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </LangWrap>
  );
};

export default ProgramCard;
