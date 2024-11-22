import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCourses, getsubscribedCourse } from "@/store/CourcesSlice";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import isExpired from "@/helpers/checkExpired";
const Program = ({ styles, Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { subscribedCourseArr, CoursecArr } = useSelector((state) => state.CourcesSlice);
  const { currentcurrency, currencyloading } = useSelector((state) => state.CurrencySlice);
  const { user_info } = useSelector((state) => state.AuthSlice);

  useEffect(() => {
    dispatch(allCourses());
    dispatch(getsubscribedCourse());
  }, [dispatch]);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "</span>";
    },
  };
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("UT")) {
      dispatch(getsubscribedCourse())
        .unwrap()
        .then(() => {})
        .catch((err) => {
          if (err?.response?.status === 401) {
            Cookies.remove("UT");
            // router.push(`/${Lang}`);
          }
        });
    }
  }, [dispatch, Lang, router]);
  const Fitness = subscribedCourseArr?.find((ele) => ele.courseId === 1);
  // const Fitness_Fottboll = subscribedCourseArr?.find(
  //   (ele) => ele.courseId === 2
  // );
  // const Football = subscribedCourseArr?.find((ele) => ele.courseId === 3);

  const handleRedirect = (item, course) => {
    const isHaveSubCourses = course?.sub_courses.length > 1;
    console.log("isHaveSubCourses", isHaveSubCourses);

    if (course?.isFull) {
      return;
    }
    if (item?.isCamp) {
      router.push(`/${Lang}/user/${course?.course_type}/details/${course?.id}`);
    } else {
      router.push(`/${Lang}/user/programs/details/${course?.id}/${isHaveSubCourses && user_info ? `sub/${course?.sub_courses[0]?.id}` : ""}`);
    }
  };

  return (
    <div className={`${styles.program_section}`} id="programs">
      <div className="container">
        <div className={"center"}>
          <h2 className={"mTle"}>{t("programs.title")}</h2>
        </div>
        {CoursecArr?.courses?.map((item) => (
          <div className={styles.itemWrap} key={item?.categoryName}>
            <div className={styles.tleFlx}>
              <div className={styles.top1_titlle}>
                <h3 className={styles.small_title}>{item?.categoryName}</h3>
              </div>
              <div className={styles.rgtSd}>
                <div
                  className={styles.cSlideNav}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <button className={styles.prev} id={`${item?.categoryName?.replace(/\s/g, "")}_prev`}>
                    <Image src={"/images/icon-rgtArrow.svg"} alt="rgtArrow" layout="fill" objectFit="contain" loading="lazy" />
                  </button>
                  <button className={styles.next} id={`${item?.categoryName?.replace(/\s/g, "")}_next`}>
                    <Image src={"/images/icon-rgtArrow.svg"} alt="rgtArrow" layout="fill" objectFit="contain" loading="lazy" />
                  </button>
                </div>
              </div>
            </div>
            <div className={`${styles.program} ${Lang === "ar" ? styles.ar_slide : styles.en_slide} ${Lang === "ar" ? "Arabic_web_program" : ""}`}>
              <Swiper
                style={{ overflow: "visible" }}
                dir={Lang === "ar" ? "rtl" : "ltr"}
                key={"courseSwiper"}
                loop={false}
                spaceBetween={10}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                preventClicksPropagation={false}
                preventClicks={false}
                pagination={pagination}
                navigation={{
                  nextEl: `#${item?.categoryName?.replace(/\s/g, "")}_next`,
                  prevEl: `#${item?.categoryName?.replace(/\s/g, "")}_prev`,
                }}
                initialSlide={1}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
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
              >
                {item?.courses?.map((course) => (
                  <SwiperSlide key={course?.id} className={styles.swiperSlide}>
                    <div className={styles.tamara_icon}>
                      <img src="/images/tamara_ribbon.png" alt="fitness" loading="lazy" />
                    </div>
                    <div
                      style={{
                        direction: Lang === "ar" ? "rtl" : "ltr",
                      }}
                      className={styles.card}
                      onClick={() => handleRedirect(item, course)}
                      role="button"
                      tabIndex={0}
                    >
                      {course?.offerPercentage && (
                        <div className={styles.filnal_price}>
                          <p>
                            {course?.offerPercentage}%<span>{t("programs.off")}</span>
                          </p>
                        </div>
                      )}
                      <div className={styles.card_image}>
                        <Image
                          src={`${process.env.customKey}/courseImages/${course?.imageUrl}`}
                          alt="fitness"
                          layout="fill"
                          objectFit="contain"
                          loading="lazy"
                        />
                      </div>
                      <div className={styles.info_card}>
                        <h4>{Lang === "ar" ? course?.name_arabic : course?.name}</h4>
                        {course?.descriptionHTML && (
                          <ul
                            className={`${Lang === "ar" ? styles.rightText : styles.leftText}`}
                            dangerouslySetInnerHTML={{
                              __html: Lang === "ar" ? course?.descriptionHTMLAr : course?.descriptionHTML,
                            }}
                          ></ul>
                        )}

                        {currencyloading ? (
                          <p>Loading</p>
                        ) : (
                          <div className={`${styles.price_offer} ${styles.leftPrice} dir-lft`}>
                            {/* <div className={`${styles.price_offer} ${
                            Lang === "ar" ? styles.rightPrice : styles.leftPrice
                          } dir-lft`}
                        > */}
                            <h5>
                              <span className={styles.currency}>{currentcurrency?.currency_code}</span>
                              {Math.ceil((course?.offerAmount * currentcurrency?.currency_rate).toFixed(2))}
                            </h5>
                            {course?.offerPercentage && (
                              <h6>
                                <span className={styles.currency}>{currentcurrency?.currency_code}</span>
                                <del>{Math.ceil((course?.amount * currentcurrency?.currency_rate).toFixed(2))} </del>
                              </h6>
                            )}
                          </div>
                        )}

                        {course?.isFull && <img src={"/images/soldout.png"} alt="fitness" loading="lazy" />}

                        <button>
                          {subscribedCourseArr?.some((obj) => obj.courseId == course?.id)
                            ? t("programs.yalla")
                            : course?.isFull
                            ? t("camp_full")
                            : t("programs.join")}
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Program;
