import Image from "next/legacy/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { getCounts } from "@/store/WhoSlice";

// Lightweight sanitization function
const sanitizeString = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.replace(/[&<>"'\/]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  }[char]));
};

const Who = ({ styles, Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { counts, count, unit } = useSelector((state) => state.WhoSlice);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Validate and sanitize data
  const safeLang = typeof Lang === "string" && Lang.length <= 5 ? Lang.toLowerCase() : "en";
  const safeCounts = Array.isArray(counts) && counts[0] 
    ? {
        head: sanitizeString(counts[0].head || ""),
        head_ar: sanitizeString(counts[0].head_ar || ""),
        subhead: sanitizeString(counts[0].subhead || ""),
        subhead_ar: sanitizeString(counts[0].subhead_ar || ""),
        videoUrl: counts[0].videoUrl && typeof counts[0].videoUrl === "string" 
          ? sanitizeString(counts[0].videoUrl) 
          : null,
        experience: Number.isFinite(parseInt(counts[0].experience)) 
          ? parseInt(counts[0].experience) 
          : 0,
        courses: Number.isFinite(parseInt(counts[0].courses)) 
          ? parseInt(counts[0].courses) 
          : 0,
      } 
    : null;
  const safeCount = Number.isFinite(parseInt(count)) ? parseInt(count) : 0;
  const safeUnit = typeof unit === "string" ? sanitizeString(unit) : "";

  // Fetch counts on mount
  useEffect(() => {
    dispatch(getCounts());
  }, [dispatch]);

  // Manual viewport detection
  useEffect(() => {
    const checkInView = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
        if (isVisible && !inView) {
          setInView(true);
        }
      }
    };

    checkInView(); // Check on mount
    window.addEventListener("scroll", checkInView);
    return () => window.removeEventListener("scroll", checkInView);
  }, [inView]);

  // Memoize counts for performance
  const countItems = useMemo(
    () => [
      {
        key: "experience",
        end: safeCounts?.experience || 0,
        label: t("who.experience"),
        icon: "/images/icon-exp.svg",
      },
      {
        key: "users",
        end: safeCount,
        label: t("who.users"),
        icon: "/images/icon-users.svg",
        suffix: safeUnit ? `${safeUnit}+` : "",
      },
      {
        key: "courses",
        end: safeCounts?.courses || 0,
        label: t("who.courses"),
        icon: "/images/icon-courses.svg",
        suffix: "%",
      },
    ],
    [safeCounts, safeCount, safeUnit, t]
  );

  return (
    <div className={styles.who_section} id="about" ref={sectionRef}>
      <div className={styles.dElmt_1}>
        <Image
          src="/images/dElmt-countBg-1.svg"
          layout="fill"
          alt="Background"
          objectFit="contain"
          loading="lazy"
        />
      </div>
      <div className="container">
        <div className={styles.dFlx}>
          <div className={styles.w_100}>
            <div className={styles.cntWrap}>
              <div className="tleWrap center">
                <h2 className="mTle">
                  {safeCounts ? (safeLang === "ar" ? safeCounts.head_ar : safeCounts.head) : t("who.title_fallback")}
                </h2>
              </div>
              <p className={styles.who_p}>
                {safeCounts ? (safeLang === "ar" ? safeCounts.subhead_ar : safeCounts.subhead) : t("who.subhead_fallback")}
              </p>
            </div>
          </div>
          <div className={styles.lftSd}>
            <div className={styles.imgWrap}>
              {safeCounts?.videoUrl ? (
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Promotional video"
                  onDoubleClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <source
                    src={`${process.env.customKey}/who_we_videos/${safeCounts.videoUrl}`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div className={styles.videoPlaceholder}>
                  {t("who.video_unavailable")}
                </div>
              )}
            </div>
          </div>
          <div className={styles.rgtSd}>
            <div className={styles.itemFlx}>
              {countItems.map((item) => (
                <div key={item.key} className={styles.item}>
                  <div className={styles.countBx}>
                    <div className={styles.dElmt_1}>
                      <Image
                        src="/images/dElmt-countBg-1.svg"
                        layout="fill"
                        alt="Background 1"
                        objectFit="contain"
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.dElmt_2}>
                      <Image
                        src="/images/dElmt-countBg-2.png"
                        layout="fill"
                        alt="Background 2"
                        objectFit="contain"
                        loading="lazy"
                      />
                    </div>
                    <span className={styles.iconWrap}>
                      <Image
                        src={item.icon}
                        layout="fill"
                        alt={`${item.label} icon`}
                        objectFit="contain"
                        loading="lazy"
                      />
                    </span>
                    <span className={styles.cntWrap}>
                      <h3 className={styles.num} style={{ direction: "ltr" }}>
                        {inView ? (
                          <CountUp
                          enableScrollSpy={true}
                            start={0}
                            end={item.end}
                            duration={2}
                            separator=","
                            suffix={item.suffix || ""}
                          >
                            {({ countUpRef }) => (
                              <span ref={countUpRef} aria-live="polite" />
                            )}
                          </CountUp>
                        ) : (
                          <span aria-live="polite">{item.end}{item.suffix || ""}</span>
                        )}
                      </h3>
                      <div className={styles.txt}>{item.label}</div>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Who;

// import { getCounts } from "@/store/WhoSlice";
// import { current } from "@reduxjs/toolkit";
// import Image from "next/legacy/image";
// import { useSelectedLayoutSegments } from "next/navigation";
// import { useRouter } from "next/router";
// import { useEffect, useRef } from "react";
// import { Button } from "react-bootstrap";
// import CountUp from "react-countup";
// import { useTranslation } from "react-i18next";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ControlBar,
//   CurrentTimeDisplay,
//   ForwardControl,
//   FullscreenToggle,
//   PlaybackRateMenuButton,
//   Player,
//   ReplayControl,
//   TimeDivider,
//   VolumeMenuButton,
// } from "video-react";

// const Who = ({ styles, Lang }) => {
//   const { t } = useTranslation();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const { counts, count, unit } = useSelector((state) => state.WhoSlice);

//   const playerref = useRef(null);

//   const handleClick = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     return;
//   };

//   useEffect(() => {
//     dispatch(getCounts());
//   }, []);

//   const playerOptns = {
//     userActions: {
//       doubleClick: false,
//     },
//   };

//   return (
//     <div className={styles.who_section} id={"about"}>
//       <div className={styles.dElmt_1}>
//         <Image
//           src={"/images/dElmt-countBg-1.svg"}
//           layout="fill"
//           alt="bg"
//           objectFit="contain"
//           loading="lazy"
//         />
//       </div>
//       <div className="container">
//         <div className={styles.dFlx}>
//           <div className={styles.w_100}>
//             <div className={styles.cntWrap}>
//               <div className={"tleWrap center"}>
//                 <h2 className={"mTle"}>
//                   {Lang === "ar" ? counts[0]?.head_ar : counts[0]?.head}
//                 </h2>
//               </div>
//               <p className={styles.who_p}>
//                 {" "}
//                 {Lang === "ar" ? counts[0]?.subhead_ar : counts[0]?.subhead}
//               </p>
//             </div>
//           </div>
//           <div className={styles.lftSd}>
//             <div className={styles.imgWrap} onDoubleClick={handleClick}>
//               {/* <video muted autoPlay loop playsInline preload="metadata" aria-label="Video player">
//                 {counts[0]?.videoUrl && (
//                   <source src={`${process.env.customKey}/who_we_videos/${counts[0].videoUrl}`} type="video/mp4" />
//                 )}
//               </video> */}
//               <Player
//                 ref={playerref}
//                 fluid
//                 playsInline={true}
//                 key={counts[0]?.id}
//                 autoPlay
//                 loop
//                 muted
//               >
//                 <source
//                   src={`${process.env.customKey}/who_we_videos/${counts[0]?.videoUrl}`}
//                 />
//                 <ControlBar>
//                   <FullscreenToggle className="ToogelFull" />
//                   <ReplayControl seconds={10} order={1.1} />
//                   <ForwardControl seconds={10} order={1.2} />
//                   <CurrentTimeDisplay order={4.1} />
//                   <TimeDivider order={4.2} />
//                   <PlaybackRateMenuButton
//                     rates={[5, 2, 1, 0.5, 0.1]}
//                     order={7.1}
//                   />
//                   <VolumeMenuButton disabled={false} />
//                 </ControlBar>
//               </Player>
//             </div>
//           </div>
//           <div className={styles.rgtSd}>
//             <div className={styles.itemFlx}>
//               <div className={styles.item}>
//                 <div className={styles.countBx}>
//                   <div className={styles.dElmt_1}>
//                     <Image
//                       src={"/images/dElmt-countBg-1.svg"}
//                       layout="fill"
//                       alt="bg"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className={styles.dElmt_2}>
//                     <Image
//                       src={"/images/dElmt-countBg-2.png"}
//                       layout="fill"
//                       alt="bg"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </div>
//                   <span className={styles.iconWrap}>
//                     <Image
//                       src={"/images/icon-exp.svg"}
//                       alt="exp"
//                       layout="fill"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </span>
//                   <span className={styles.cntWrap}>
//                     <h3 className={styles.num} style={{ direction: "ltr" }}>
//                       <span
//                         className={`${styles.counter} counter`}
//                         data-target={"14"}
//                       >
//                         <CountUp
//                           enableScrollSpy={true}
//                           start={0}
//                           end={parseInt(counts[0]?.experience) || 0}
//                           key={"experience-count"}
//                         />
//                       </span>
//                     </h3>
//                     <div className={styles.txt}>{t("who.experience")}</div>
//                   </span>
//                 </div>
//               </div>
//               <div className={styles.item}>
//                 <div className={styles.countBx}>
//                   <div className={styles.dElmt_1}>
//                     <Image
//                       src={"/images/dElmt-countBg-1.svg"}
//                       layout="fill"
//                       alt="bg"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className={styles.dElmt_2}>
//                     <Image
//                       src={"/images/dElmt-countBg-2.png"}
//                       layout="fill"
//                       alt="bg"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </div>
//                   <span className={styles.iconWrap}>
//                     <Image
//                       src={"/images/icon-users.svg"}
//                       alt="exp"
//                       layout="fill"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </span>
//                   <span className={styles.cntWrap}>
//                     <h3 className={styles.num} style={{ direction: "ltr" }}>
//                       <span
//                         className={`${styles.counter} counter`}
//                         data-target={"10"}
//                       >
//                         <CountUp
//                           enableScrollSpy={true}
//                           start={0}
//                           end={parseInt(count ? count : 0) || 0}
//                           key={"users-count"}
//                         />
//                       </span>
//                       {unit ? unit : ""}+
//                     </h3>
//                     <div className={styles.txt}>{t("who.users")}</div>
//                   </span>
//                 </div>
//               </div>
//               <div className={styles.item}>
//                 <div className={styles.countBx}>
//                   <div className={styles.dElmt_1}>
//                     <Image
//                       src={"/images/dElmt-countBg-1.svg"}
//                       layout="fill"
//                       alt="bg"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className={styles.dElmt_2}>
//                     <Image
//                       src={"/images/dElmt-countBg-2.png"}
//                       layout="fill"
//                       alt="bg"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </div>
//                   <span className={styles.iconWrap}>
//                     <Image
//                       src={"/images/icon-courses.svg"}
//                       alt="exp"
//                       layout="fill"
//                       objectFit="contain"
//                       loading="lazy"
//                     />
//                   </span>
//                   <span className={styles.cntWrap}>
//                     <h3 className={styles.num} style={{ direction: "ltr" }}>
//                       <span
//                         className={`${styles.counter} counter`}
//                         data-target={"10"}
//                       >
//                         <CountUp
//                           enableScrollSpy={true}
//                           start={0}
//                           end={parseInt(counts[0]?.courses) || 0}
//                           key={"courses-count"}
//                         />
//                       </span>
//                       %
//                     </h3>
//                     <div className={styles.txt}>{t("who.courses")}</div>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Who;
