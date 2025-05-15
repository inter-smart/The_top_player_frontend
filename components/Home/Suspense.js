import Image from "next/legacy/image";
// import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactTyped } from "react-typed";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBanners } from "@/store/BannerSlice";
// import Typewriter from "typewriter-effect";
// import useIntersectionObserver from "@react-hook/intersection-observer";
// import ReactPlayer from "react-player";
// import {
//   ControlBar,
//   CurrentTimeDisplay,
//   ForwardControl,
//   PlayToggle,
//   PlaybackRateMenuButton,
//   Player,
//   ReplayControl,
//   TimeDivider,
//   VolumeMenuButton,
//   FullscreenToggle,
// } from "video-react";

const Suspense = ({ styles, Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const containerRef = useRef();
  // const videoEl = useRef(null);
  // const lockRef = useRef(false);
  // const { isIntersecting } = useIntersectionObserver(containerRef);
  // if (isIntersecting) {
  //   lockRef.current = true;
  // }
  // const videoRef = useRef(null);
  // const [videoPlay, setVideoPlay] = useState(true);

  // const togglePlay = () => {
  //   if (videoRef.current.paused) {
  //     videoRef.current.play();
  //     // setIsPlaying(true);
  //   } else {
  //     videoRef.current.pause();
  //     // setIsPlaying(false);
  //   }
  // };

  const { banners } = useSelector((state) => state.BannerSlice);

  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch]);

  return (
    <div className={`${styles.Suspense}`} style={{ padding: 0, margin: 0 }}>
      <div className={styles.dElmt_1}>
        <Image src={"/images/dElmt-countBg-1.svg"} layout="fill" alt="bg" objectFit="contain" loading="lazy" />
      </div>
      <div className={`container`}>
        <div className="row align-items-center justify-content-between ">
          <div className="col-12 col-lg-6">
            <div className={styles.become}>
              <h2>{Lang === "ar" ? banners?.heading_ar : banners?.heading}</h2>
              <h4 className={`${styles.become_animation} become_animation`}>
                {Lang === "ar" ? banners?.non_animate_text_ar : banners?.non_animate_text} &nbsp;
                {/* {t("suspens.become")} &nbsp; */}
                <span>
                  {Lang === "ar" ? (
                    <ReactTyped
                      strings={banners?.animate_text_ar || [""]}
                      typeSpeed={40}
                      backSpeed={40}
                      backDelay={1500}
                      // startDelay={}
                      loop
                    />
                  ) : (
                    <ReactTyped
                      strings={banners?.animate_text || [""]}
                      typeSpeed={40}
                      backSpeed={40}
                      backDelay={1500}
                      // startDelay={}
                      loop
                    />
                  )}
                </span>
              </h4>
              <p>{Lang === "ar" ? banners?.para_ar : banners?.para}</p>
              {/* <p>{t("suspens.intro4")}</p> */}
            </div>
          </div>
          <div className="col-12 col-lg-6  col_video_mobile">
            <Swiper
              // effect={"fade"}
              dir={Lang === "ar" ? "rtl" : "ltr"}
              key={"gallerySwiper"}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              pagination={false}
              navigation={false}
              initialSlide={0}
              preventClicksPropagation={false}
              preventClicks={false}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[EffectFade, Autoplay]}
            >
              {banners?.images?.map((banner) => (
                <SwiperSlide key={banner?.id}>
                  <div
                    className={`${styles.Video_Suspense} Video_Suspense video-container ${
                      Lang === "ar" ? styles.susAr : styles.susEn
                    }`}
                  >
                    <Image
                      src={`${process.env.customKey}/bannerImages/${banner?.imageUrl}`}
                      layout="fill"
                      alt="topPlayer"
                      objectFit="contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <Player fluid playsInline={true} autoPlay muted>
                <source
                  src={"https://backend.thetopplayer.com/videos/Suspense.mp4"}
                />
                <ControlBar>
                  <FullscreenToggle className="ToogelFull"  />
                  <CurrentTimeDisplay order={4.1} />
                  <TimeDivider order={4.2} />
                  <PlaybackRateMenuButton
                    rates={[5, 2, 1, 0.5, 0.1]}
                    order={7.1}
                  />
                  <VolumeMenuButton  />
                </ControlBar>
              </Player> */}
            {/* </div> */}
            {/* <div className={styles.Video_Suspense}
             ref={containerRef}>
            {
              lockRef.current &&
              <video 
              ref={videoEl}
              muted autoPlay loop playsInline controls preload="metadata">
              <source
                src="https://backend.thetopplayer.com/videos/Suspense.mp4"
                type="video/mp4"
              />
            </video>}             
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suspense;
