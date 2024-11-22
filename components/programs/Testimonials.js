import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Program.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Rating } from "react-simple-star-rating";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTestimonials,
  getTestimonialById,
} from "@/store/TestimonialSlice";

const Testimonials = ({ Lang, programId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const testimonials = useSelector(
    (state) => state.TestimonialSlice.testimonialById
  );


  useEffect(() => {
    dispatch(getTestimonialById(programId));
  }, [dispatch,programId]);

  return (
    <div className={styles.testimonials_section}>
      <div className={"container"}>
        <div className={"tleWrap center"}>
          {testimonials && testimonials.length != 0 && (
            <div className={"mTle"}>{t("testimonials")}</div>
          )}
        </div>
        {/* <Swiper
        loop={true}
        dir={Lang === "ar" ? "rtl" : "ltr"}
        key={Lang}
        slidesPerView={"auto"}
        spaceBetween={0}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className={"testiSlide"}
      > */}

        <Swiper
          loop={false}
          rewind={true}
          dir={Lang === "ar" ? "rtl" : "ltr"}
          key={Lang}
          centeredSlides={true}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          pagination={{
            clickable: true,
          }}
          className={"testiSlide"}
          // initialSlide={1}
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
          {testimonials?.map((testimonial) => (
            <SwiperSlide key={testimonial?.id}>
              <div className={styles.testiBx}>
                <div className={styles.iconWrap}>
                  <Rating
                    initialValue={testimonial?.rating}
                    readonly
                    rtl={Lang === "ar" ? true : false}
                    size={16}
                    fillColor={"#FCA34A"}
                  />
                </div>
                <div className={styles.cntWrap}>
                  <p>
                    {Lang === "ar"
                      ? testimonial?.comment_ar
                      : testimonial?.comment_en}
                  </p>
                </div>
                <div className={styles.infoWrap}>
                  <div className={styles.tle}>
                    {Lang === "ar"
                      ? testimonial?.user_name_ar
                      : testimonial?.user_name}
                  </div>
                  <div className={styles.sTle}>
                    {Lang === "ar"
                      ? testimonial?.course?.name_arabic
                      : testimonial?.role}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
