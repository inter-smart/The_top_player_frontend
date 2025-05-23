import React from "react";
import styles from "@/styles/Programs.module.css";
import { FaDumbbell } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { useRouter } from "next/router";
import { useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import LangWrap from "@/components/layouts/LangWarp";
import InnerBanner from "@/components/layouts/InnerBanner";
import Testimonials from "@/components/programs/Testimonials";
import isExpired from "@/helpers/checkExpired";
import { useSelector } from "react-redux";
import { RiLock2Line } from "react-icons/ri";
import ProgramCard from "@/components/programs/ProgramCard";
import EnrollProgram from "@/components/programs/EnrollProgram";
import axios from "axios";

// Lazy load heavy components
const Personlized = dynamic(() => import("@/components/programs/Personalized2"), {
  loading: () => <></>,
  ssr: false,
});

// Week configuration to reduce repetitive code
const WEEKS_CONFIG = [
  { weekKey: "week1", days: [1, 2, 3, 4, 5], completionDay: 5 },
  { weekKey: "week2", days: [6, 7, 8, 9, 10], completionDay: 10 },
  { weekKey: "week3", days: [11, 12, 13, 14, 15], completionDay: 15 },
  { weekKey: "week4", days: [16, 17, 18, 19, 20], completionDay: 20 },
];

const TOTAL_DAYS = 28;

// Memoized WeekProgress component to prevent unnecessary re-renders
const WeekProgress = ({
  weekConfig,
  weekIndex,
  SubCourseArr,
  CoursecArr,
  isPurchased,
  expired,
  Lang,
  t,
  handleClick,
  targetDivRef,
}) => {
  const { weekKey, days, completionDay } = weekConfig;
  const isFirstWeek = weekIndex === 0;

  return (
    <div className={styles.progress_week} ref={isFirstWeek ? targetDivRef : null}>
      <div className={styles.line}>
        <div className={`${SubCourseArr.finished_days?.includes(completionDay) ? styles.circel : styles.not_circel}`}>
          <FaStar />
        </div>
        <span></span>
      </div>

      <div className={styles.mobile_grid}>
        <div className={styles.progress_info}>
          <h4>
            {t(`programs_details.weeks.${weekKey}`)}
            <span className="En_num">{weekIndex + 1}</span>
          </h4>
        </div>

        <div className={styles.icon_parent}>
          {/* Lock icon for non-purchased or expired courses (except first week) */}
          {!isFirstWeek && (!isPurchased || expired) && (
            <div className={Lang === "en" ? styles.lock_icon : styles.lock_icon_ar}>
              <RiLock2Line onClick={() => handleClick(0, 0)} />
            </div>
          )}

          <div className={`${styles.time_line} ${!isFirstWeek && (!isPurchased || expired) ? styles.disabled : ""}`}>
            <div className={styles.days_number}>
              {days.slice(0, 3).map((day, index) => (
                <div key={day}>
                  <div
                    onClick={() => handleClick(weekIndex + 1, day)}
                    className={`${SubCourseArr.finished_days?.includes(day) ? styles.active : styles.not_active}`}
                  >
                    {isFirstWeek && day === 1 && !isPurchased ? (
                      <span className={styles.free_trial_text}>{t("programs.free_trial")}</span>
                    ) : isPurchased && !expired ? (
                      index + 1
                    ) : day === 1 ? (
                      index + 1
                    ) : (
                      <RiLock2Line />
                    )}
                  </div>
                  {index < 2 && (
                    <span>
                      <MdArrowForwardIos />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.days_number}>
              {days.slice(3).map((day, index) => (
                <div key={day}>
                  <div
                    onClick={() => handleClick(weekIndex + 1, day)}
                    className={`${SubCourseArr.finished_days?.includes(day) ? styles.active : styles.not_active}`}
                  >
                    {isPurchased && !expired ? index + 4 : <RiLock2Line />}
                  </div>
                  <span>
                    <MdArrowForwardIos />
                  </span>
                </div>
              ))}
              <span
                className={`${styles.cup} ${
                  SubCourseArr.finished_days?.includes(completionDay) ? styles.cup_active : styles.not_active
                }`}
              >
                <GiTrophyCup />
              </span>
            </div>

            <div className={styles.start_btn} onClick={() => handleClick(weekIndex + 1, days[0])}>
              {t(SubCourseArr?.finished_weeks.includes(weekIndex + 1) ? "programs_details.completed" : "programs_details.start")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Fitness = ({
  programs_id,
  CourseByIdArray,
  Lang,
  sub_id,
  CoursecArr,
  SubCourseArr,
  isPurchased,
  error,
  error_status,
  error_Text,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const targetDivRef = useRef(null);

  // Memoize user info selector
  const user_info = useSelector((state) => state.AuthSlice.user_info);
  const isLoggedIn = useMemo(() => Boolean(user_info), [user_info]);

  // Memoize expensive calculations
  const { expired, AllDays_finished, progressPercentage } = useMemo(() => {
    const expired = SubCourseArr ? isExpired(CoursecArr?.endDate) : false;
    const daysFinished = SubCourseArr?.finished_days?.length || 0;
    const weeksFinished = (SubCourseArr?.finished_weeks?.length || 0) * 2;
    const AllDays_finished = daysFinished + weeksFinished;
    const progressPercentage = parseInt((AllDays_finished / TOTAL_DAYS) * 100) || 0;

    return { expired, AllDays_finished, progressPercentage };
  }, [SubCourseArr, CoursecArr?.endDate]);

  // Handle error redirect
  useEffect(() => {
    if (error) {
      const errorText = error_Text || "unknown-error";
      router.push(`/${Lang}/error-handel/${encodeURIComponent(errorText)}`);
    }
  }, [error, Lang, router, error_Text]);

  // Memoized scroll function
  const scrollToDiv = useCallback(() => {
    targetDivRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  // Memoized redirect function
  const handleRedirectToPayment = useCallback(() => {
    if (Cookies.get("UT")) {
      router.push(`/${Lang}/user/payment/${programs_id}`);
    } else {
      sessionStorage.setItem("courseId", programs_id);
      router.push(`/${Lang}/auth/login`);
    }
  }, [Lang, programs_id, router]);

  // Memoized click handler
  const handleClick = useCallback(
    (week, day) => {
      if (!isLoggedIn && day !== 1) {
        return handleRedirectToPayment();
      }

      if (day === 1) {
        const url = `/${Lang}/user/programs/${CoursecArr?.name}/${week}/${day}/${CoursecArr?.id}/${SubCourseArr?.id}`;
        router.push(url);
        return;
      }

      if (isPurchased) {
        const url = expired
          ? `/${Lang}/user/payment/${CoursecArr?.id}`
          : `/${Lang}/user/programs/${CoursecArr?.name}/${week}/${day}/${CoursecArr?.id}/${SubCourseArr?.id}`;
        router.push(url);
      } else {
        router.push(`/${Lang}/user/payment/${CoursecArr?.id}`);
      }
    },
    [isLoggedIn, Lang, CoursecArr, SubCourseArr, isPurchased, expired, router, handleRedirectToPayment]
  );

  // Memoize sub courses links
  const subCoursesLinks = useMemo(() => {
    if (!CoursecArr?.subCourses || CoursecArr.subCourses.length <= 1) return null;

    return CoursecArr.subCourses.map((ele) => (
      <Link
        key={ele.id}
        style={{ textDecoration: "none" }}
        className={`${ele.id === parseInt(sub_id) ? styles.active : ""} ${
          Lang === "ar" ? styles.Ar_subCourses_Link : styles.En_subCourses_Link
        }`}
        href={`/${Lang}/user/programs/details/${programs_id}/sub/${ele.id}`}
      >
        {Lang === "en" && ele.name}
        {Lang === "ar" && ele.name === "fitness Program" && "برنامج اللياقة"}
        {Lang === "ar" && ele.name === "football Program" && "برنامج كرة القدم"}
      </Link>
    ));
  }, [CoursecArr?.subCourses, sub_id, Lang, programs_id]);

  // Early return if no course data
  if (!CoursecArr || !SubCourseArr) {
    return null;
  }

  return (
    <LangWrap Lang={Lang}>
      <InnerBanner
        imageUrl={`${process.env.customKey}/courseImages/${CourseByIdArray?.bannerUrl}`}
        title={CourseByIdArray?.name}
        title_ar={CourseByIdArray?.name_arabic}
        Lang={Lang}
      />

      {/* Sub courses navigation */}
      {subCoursesLinks && (
        <div className={styles.sub_course} style={{ marginTop: "15px" }}>
          {subCoursesLinks}
        </div>
      )}

      {/* Program card for non-purchased or expired */}
      {(!isPurchased || expired) && (
        <ProgramCard
          programDetails={CourseByIdArray}
          expired={expired}
          Lang={Lang}
          programsId={programs_id}
          isLoggedIn={isLoggedIn}
          onTriggerScroll={scrollToDiv}
        />
      )}

      <Personlized Lang={Lang} styles={styles} videoUrl={CourseByIdArray?.videoUrl} />

      {/* Progress section */}
      <div className={styles.enrolled_section}>
        <div className="container">
          <div className={styles.days}>
            <div className={`${styles.day_finish} ${Lang === "ar" ? styles.Ar_day_finish : ""}`}>
              <h3>
                {AllDays_finished}/{TOTAL_DAYS}
              </h3>
              <p>{t("programs_details.finish")}</p>
            </div>
            <h3 className="En_num">{progressPercentage}%</h3>
          </div>

          <div className={`${styles.progress_week_grid} ${Lang === "ar" ? styles.Ar_rotate : ""}`}>
            {WEEKS_CONFIG.map((weekConfig, index) => (
              <WeekProgress
                key={weekConfig.weekKey}
                weekConfig={weekConfig}
                weekIndex={index}
                SubCourseArr={SubCourseArr}
                CoursecArr={CoursecArr}
                isPurchased={isPurchased}
                expired={expired}
                Lang={Lang}
                t={t}
                handleClick={handleClick}
                targetDivRef={index === 0 ? targetDivRef : null}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials for non-purchased */}
      {!isPurchased && <Testimonials Lang={Lang} programId={programs_id} />}

      {/* Enrollment section */}
      {(!isPurchased || expired) && (
        <EnrollProgram
          Lang={Lang}
          programId={programs_id}
          CoursecArr={CoursecArr}
          expired={expired}
          CourseByIdArray={CourseByIdArray}
        />
      )}
    </LangWrap>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(Fitness);

export async function getServerSideProps({ req, params }) {
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Access-Token": req.cookies.UT,
    };

    // Use Promise.allSettled to handle partial failures gracefully
    const [courseResult, subCourseResult, courseByIdResult] = await Promise.allSettled([
      axios.get(`${process.env.customKey}/course/${parseInt(params.programs_id)}`, { headers }),
      axios.get(`${process.env.customKey}/subcourse/${parseInt(params.programs_id)}/${parseInt(params.sub)}`, { headers }),
      axios.get(`${process.env.customKey}/courseById/${parseInt(params.programs_id)}`, { headers }),
    ]);

    // Check if critical API calls failed
    if (courseResult.status === "rejected" || subCourseResult.status === "rejected") {
      const error = courseResult.status === "rejected" ? courseResult.reason : subCourseResult.reason;
      throw error;
    }

    return {
      props: {
        CoursecArr: courseResult.value.data,
        SubCourseArr: subCourseResult.value.data,
        CourseByIdArray: courseByIdResult.status === "fulfilled" ? courseByIdResult.value.data.course : null,
        isPurchased: courseResult.value.data.isPurchased || null,
        programs_id: params.programs_id,
        Lang: params.Lang.toLowerCase(),
        sub_id: params.sub,
        error: false,
      },
    };
  } catch (err) {
    // Provide a fallback error message
    const errorMessage = err?.response?.data?.message || err?.message || "Something went wrong";

    return {
      props: {
        CoursecArr: null,
        SubCourseArr: null,
        CourseByIdArray: null,
        programs_id: params.programs_id,
        Lang: params.Lang.toLowerCase(),
        sub_id: params.sub,
        error: true,
        error_status: err?.response?.status || 500,
        error_Text: errorMessage,
      },
    };
  }
}

// import Image from "next/legacy/image";
// import styles from "@/styles/Programs.module.css";
// import { FaDumbbell } from "react-icons/fa";
// import { GiTrophyCup } from "react-icons/gi";
// import { MdArrowForwardIos } from "react-icons/md";
// import { FaStar } from "react-icons/fa6";
// import { useRouter } from "next/router";
// // import { useEffect } from "react";
// // import axios from "axios";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getCources, getSubCources } from "@/store/CourcesSlice";
// import { useEffect, useRef } from "react";
// import Link from "next/link";
// import Cookies from "js-cookie";
// import { useTranslation } from "react-i18next";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import LangWrap from "@/components/layouts/LangWarp";
// import InnerBanner from "@/components/layouts/InnerBanner";
// import Testimonials from "@/components/programs/Testimonials";
// import isExpired from "@/helpers/checkExpired";
// import { useSelector } from "react-redux";
// import { RiLock2Line } from "react-icons/ri";
// import ProgramCard from "@/components/programs/ProgramCard";
// import EnrollProgram from "@/components/programs/EnrollProgram";

// const Personlized = dynamic(() => import("@/components/programs/Personalized2"), {
//   loading: () => <></>,
//   ssr: false,
// });
// const Fitness = ({ programs_id, CourseByIdArray, Lang, sub_id, CoursecArr, SubCourseArr, isPurchased, error, error_status, error_Text }) => {
//   const router = useRouter();
//   // const dispatch = useDispatch();
//   const { t } = useTranslation();
//   const targetDivRef = useRef(null);
//   useEffect(() => {
//     if (error) {
//       router.push(`/${Lang}/error-handel/${error_Text}`);
//     }
//   }, [error, Lang, router, error_status, error_Text]);

//   const expired = SubCourseArr ? isExpired(CoursecArr?.endDate) : false;

//   const user_info = useSelector((state) => state.AuthSlice.user_info);

//   const isLoggedIn = user_info ? true : false;

//   const scrollToDiv = () => {
//     if (targetDivRef.current) {
//       targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//     }
//   };

//   const daysFinished = SubCourseArr?.finished_days?.length;
//   const weeksFinished = SubCourseArr?.finished_weeks?.length * 2;
//   const AllDays_finished = daysFinished + weeksFinished;
//   // //console.log(AllDays_finished)

//   const handleRedirectToPayment = () => {
//     if (Cookies.get("UT")) {
//       router.push(`/${Lang}/user/payment/${programs_id}`);
//     } else {
//       sessionStorage.setItem("courseId", programs_id);
//       router.push(`/${Lang}/auth/login`);
//     }
//   };

//   const handleClick = (week, day) => {
//     if (!isLoggedIn && day !== 1) {
//       return handleRedirectToPayment();
//     }

//     if (day == 1) {
//       const url = `/${Lang}/user/programs/${CoursecArr?.name}/${week}/${day}/${CoursecArr?.id}/${SubCourseArr?.id}`;
//       router.push(url);
//       return;
//     }
//     if (isPurchased) {
//       const url = expired
//         ? `/${Lang}/user/payment/${CoursecArr?.id}`
//         : `/${Lang}/user/programs/${CoursecArr?.name}/${week}/${day}/${CoursecArr?.id}/${SubCourseArr?.id}`;
//       router.push(url);
//     } else {
//       router.push(`/${Lang}/user/payment/${CoursecArr?.id}`);
//     }
//   };

//   return (
//     <LangWrap Lang={Lang}>
//       <InnerBanner
//         imageUrl={`${process.env.customKey}/courseImages/${CourseByIdArray?.bannerUrl}`}
//         title={CourseByIdArray?.name}
//         title_ar={CourseByIdArray?.name_arabic}
//         Lang={Lang}
//       />
//       {CoursecArr?.subCourses?.length > 1 && (
//         <div className={styles.sub_course} style={{ marginTop: "15px" }}>
//           {CoursecArr?.subCourses?.map((ele) => {
//             return (
//               <Link
//                 style={{ textDecoration: "none" }}
//                 key={ele.id}
//                 className={`${ele.id === parseInt(sub_id) ? styles.active : ""}

//                   ${Lang === "ar" ? styles.Ar_subCourses_Link : styles.En_subCourses_Link}`}
//                 href={`/${Lang}/user/programs/details/${programs_id}/sub/${ele.id}

//                   `}
//               >
//                 {Lang === "en" && ele.name}
//                 {Lang === "ar" && ele.name === "fitness Program" && "برنامج اللياقة"}
//                 {Lang === "ar" && ele.name === "football Program" && "برنامج كرة القدم"}
//               </Link>
//             );
//           })}
//         </div>
//       )}

//       {(!isPurchased || expired) && (
//         <ProgramCard
//           programDetails={CourseByIdArray}
//           expired={expired}
//           Lang={Lang}
//           programsId={programs_id}
//           isLoggedIn={isLoggedIn}
//           onTriggerScroll={scrollToDiv}
//         />
//       )}

//       <Personlized Lang={Lang} styles={styles} videoUrl={CourseByIdArray?.videoUrl} />
//       {CoursecArr && (
//         <div className={styles.enrolled_section}>
//           <div className={"container"}>
//             <div className={styles.days}>
//               <div className={`${styles.day_finish} ${Lang === "ar" ? styles.Ar_day_finish : ""}`}>
//                 {/* <h3>0/20</h3> */}
//                 {CoursecArr && <h3>{AllDays_finished || 0}/28</h3>}
//                 <p>{t("programs_details.finish")}</p>
//               </div>
//               {CoursecArr && <h3 className="En_num">{parseInt((AllDays_finished / 28) * 100) || 0}%</h3>}
//             </div>
//             {CoursecArr && (
//               <div className={`${styles.progress_week_grid} ${Lang === "ar" ? styles.Ar_rotate : ""}`}>
//                 <div className={styles.progress_week} ref={targetDivRef}>
//                   <div className={styles.line}>
//                     <div className={` ${SubCourseArr.finished_days?.includes(5) ? styles.circel : styles.not_circel} `}>
//                       <FaStar />
//                     </div>
//                     <span></span>
//                   </div>
//                   <div className={styles.mobile_grid}>
//                     <div className={styles.progress_info}>
//                       <h4>
//                         {t("programs_details.weeks.week1")}
//                         <span className="En_num">1</span>
//                       </h4>
//                     </div>
//                     <div className={styles.time_line}>
//                       <div className={styles.days_number}>
//                         <div
//                           onClick={() => handleClick(1, 1)}
//                           className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(1) ? styles.active : styles.not_active} `}
//                         >
//                           {isPurchased ? 1 : <span className={styles.free_trial_text}>{t("programs.free_trial")}</span>}
//                         </div>
//                         <span>
//                           <MdArrowForwardIos />
//                         </span>
//                         <div
//                           onClick={() => handleClick(1, 2)}
//                           className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(2) ? styles.active : styles.not_active} `}
//                         >
//                           {isPurchased ? expired ? <RiLock2Line /> : 2 : <RiLock2Line />}
//                         </div>
//                         <span>
//                           <MdArrowForwardIos />
//                         </span>
//                         <div
//                           onClick={() => handleClick(1, 3)}
//                           className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(3) ? styles.active : styles.not_active} `}
//                         >
//                           {isPurchased ? expired ? <RiLock2Line /> : 3 : <RiLock2Line />}
//                         </div>
//                       </div>
//                       <div className={styles.days_number}>
//                         <div
//                           onClick={() => handleClick(1, 4)}
//                           className={` ${SubCourseArr.finished_days?.includes(4) ? styles.active : styles.not_active} `}
//                         >
//                           {isPurchased ? expired ? <RiLock2Line /> : 4 : <RiLock2Line />}
//                         </div>
//                         <span>
//                           <MdArrowForwardIos />
//                         </span>
//                         <div
//                           onClick={() => handleClick(1, 5)}
//                           className={` ${SubCourseArr.finished_days?.includes(5) ? styles.active : styles.not_active} `}
//                         >
//                           {isPurchased ? expired ? <RiLock2Line /> : 5 : <RiLock2Line />}
//                         </div>
//                         <span>
//                           <MdArrowForwardIos />
//                         </span>
//                         <span className={`${styles.cup} ${SubCourseArr.finished_days?.includes(5) ? styles.cup_active : styles.not_active} `}>
//                           <GiTrophyCup />
//                         </span>
//                       </div>
//                       <div className={styles.start_btn} onClick={() => handleClick(1, 1)}>
//                         {t(SubCourseArr?.finished_weeks.includes(1) ? "programs_details.completed" : "programs_details.start")}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.progress_week}>
//                   <div className={styles.line}>
//                     <div className={` ${SubCourseArr.finished_days?.includes(10) ? styles.circel : styles.not_circel} `}>
//                       <FaStar />
//                     </div>
//                     <span></span>
//                   </div>

//                   <div className={styles.mobile_grid}>
//                     <div className={styles.progress_info}>
//                       <h4>
//                         {t("programs_details.weeks.week2")}
//                         <span className="En_num">2</span>
//                       </h4>
//                     </div>
//                     <div className={styles.icon_parent}>
//                       {isPurchased ? (
//                         expired ? (
//                           <div className={Lang == "en" ? styles.lock_icon : styles.lock_icon_ar}>
//                             <RiLock2Line onClick={() => handleClick(0, 0)} />
//                           </div>
//                         ) : null
//                       ) : (
//                         <div className={Lang == "en" ? styles.lock_icon : styles.lock_icon_ar}>
//                           <RiLock2Line onClick={() => handleClick(0, 0)} />
//                         </div>
//                       )}
//                       <div className={`${styles.time_line} ${isPurchased ? (expired ? styles.disabled : "") : styles.disabled}`}>
//                         <div className={styles.days_number}>
//                           <div
//                             onClick={() => handleClick(2, 6)}
//                             className={` ${SubCourseArr.finished_days?.includes(6) ? styles.active : styles.not_active} `}
//                           >
//                             1
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(2, 7)}
//                             className={` ${SubCourseArr.finished_days?.includes(7) ? styles.active : styles.not_active} `}
//                           >
//                             2
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(2, 8)}
//                             className={` ${SubCourseArr.finished_days?.includes(8) ? styles.active : styles.not_active} `}
//                           >
//                             3
//                           </div>
//                         </div>
//                         <div className={styles.days_number}>
//                           <div
//                             onClick={() => handleClick(2, 9)}
//                             className={` ${SubCourseArr.finished_days?.includes(9) ? styles.active : styles.not_active} `}
//                           >
//                             4
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(2, 10)}
//                             className={` ${SubCourseArr.finished_days?.includes(10) ? styles.active : styles.not_active} `}
//                           >
//                             5
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <span className={`${styles.cup} ${SubCourseArr.finished_days?.includes(10) ? styles.cup_active : styles.not_active} `}>
//                             <GiTrophyCup />
//                           </span>
//                         </div>
//                         <div className={styles.start_btn} onClick={() => handleClick(2, 6)}>
//                           {" "}
//                           {t("programs_details.start")}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.progress_week}>
//                   <div className={styles.line}>
//                     <div className={` ${SubCourseArr.finished_days?.includes(15) ? styles.circel : styles.not_circel} `}>
//                       <FaStar />
//                     </div>
//                     <span></span>
//                   </div>

//                   <div className={styles.mobile_grid}>
//                     <div className={styles.progress_info}>
//                       <h4>
//                         {t("programs_details.weeks.week3")}
//                         <span className="En_num">3</span>
//                       </h4>
//                     </div>
//                     <div className={styles.icon_parent}>
//                       {isPurchased ? (
//                         expired ? (
//                           <div className={Lang == "en" ? styles.lock_icon : styles.lock_icon_ar}>
//                             <RiLock2Line onClick={() => handleClick(0, 0)} />
//                           </div>
//                         ) : null
//                       ) : (
//                         <div className={Lang == "en" ? styles.lock_icon : styles.lock_icon_ar}>
//                           <RiLock2Line onClick={() => handleClick(0, 0)} />
//                         </div>
//                       )}
//                       <div className={`${styles.time_line} ${isPurchased ? (expired ? styles.disabled : "") : styles.disabled}`}>
//                         <div className={styles.days_number}>
//                           <div
//                             onClick={() => handleClick(3, 11)}
//                             className={` ${SubCourseArr.finished_days?.includes(11) ? styles.active : styles.not_active} `}
//                           >
//                             1
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(3, 12)}
//                             className={` ${SubCourseArr.finished_days?.includes(12) ? styles.active : styles.not_active} `}
//                           >
//                             2
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(3, 13)}
//                             className={` ${SubCourseArr.finished_days?.includes(13) ? styles.active : styles.not_active} `}
//                           >
//                             3
//                           </div>
//                         </div>
//                         <div className={styles.days_number}>
//                           <div
//                             onClick={() => handleClick(3, 14)}
//                             className={` ${SubCourseArr.finished_days?.includes(14) ? styles.active : styles.not_active} `}
//                           >
//                             4
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(3, 15)}
//                             className={` ${SubCourseArr.finished_days?.includes(15) ? styles.active : styles.not_active} `}
//                           >
//                             5
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <span className={`${styles.cup} ${SubCourseArr.finished_days?.includes(15) ? styles.cup_active : styles.not_active} `}>
//                             <GiTrophyCup />
//                           </span>
//                         </div>
//                         <div className={styles.start_btn} onClick={() => handleClick(3, 11)}>
//                           {" "}
//                           {t("programs_details.start")}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.progress_week}>
//                   <div className={styles.line}>
//                     <div className={` ${SubCourseArr.finished_days?.includes(20) ? styles.circel : styles.not_circel} `}>
//                       <FaStar />
//                     </div>
//                     <span></span>
//                   </div>
//                   <div className={styles.mobile_grid}>
//                     <div className={styles.progress_info}>
//                       <h4>
//                         {t("programs_details.weeks.week4")}
//                         <span className="En_num">4</span>
//                       </h4>
//                     </div>
//                     <div className={styles.icon_parent}>
//                       {isPurchased ? (
//                         expired ? (
//                           <div className={Lang == "en" ? styles.lock_icon : styles.lock_icon_ar}>
//                             <RiLock2Line onClick={() => handleClick(0, 0)} />
//                           </div>
//                         ) : null
//                       ) : (
//                         <div className={Lang == "en" ? styles.lock_icon : styles.lock_icon_ar}>
//                           <RiLock2Line onClick={() => handleClick(0, 0)} />
//                         </div>
//                       )}

//                       <div className={`${styles.time_line} ${isPurchased ? (expired ? styles.disabled : "") : styles.disabled}`}>
//                         <div className={styles.days_number}>
//                           <div
//                             onClick={() => handleClick(4, 16)}
//                             className={` ${SubCourseArr.finished_days?.includes(16) ? styles.active : styles.not_active} `}
//                           >
//                             1
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(4, 17)}
//                             className={` ${SubCourseArr.finished_days?.includes(17) ? styles.active : styles.not_active} `}
//                           >
//                             2
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(4, 18)}
//                             className={` ${SubCourseArr.finished_days?.includes(18) ? styles.active : styles.not_active} `}
//                           >
//                             3
//                           </div>
//                         </div>
//                         <div className={styles.days_number}>
//                           <div
//                             onClick={() => handleClick(4, 19)}
//                             className={` ${SubCourseArr.finished_days?.includes(19) ? styles.active : styles.not_active} `}
//                           >
//                             4
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <div
//                             onClick={() => handleClick(4, 20)}
//                             className={` ${SubCourseArr.finished_days?.includes(20) ? styles.active : styles.not_active} `}
//                           >
//                             5
//                           </div>
//                           <span>
//                             <MdArrowForwardIos />
//                           </span>
//                           <span className={`${styles.cup} ${SubCourseArr.finished_days?.includes(20) ? styles.cup_active : styles.not_active} `}>
//                             <GiTrophyCup />
//                           </span>
//                         </div>
//                         <div className={styles.start_btn} onClick={() => handleClick(4, 16)}>
//                           {" "}
//                           {t("programs_details.start")}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {}
//       {!isPurchased && <Testimonials Lang={Lang} programId={programs_id} />}
//       {(!isPurchased || expired) && (
//         <EnrollProgram Lang={Lang} programId={programs_id} CoursecArr={CoursecArr} expired={expired} CourseByIdArray={CourseByIdArray} />
//       )}
//     </LangWrap>
//   );
// };

// export default Fitness;

// export async function getServerSideProps({ req, params }) {
//   try {
//     const result = await axios
//       .get(`${process.env.customKey}/course/${parseInt(params.programs_id)}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "X-Access-Token": req.cookies.UT,
//         },
//       })
//       .then((res) => res.data);

//     const data = await axios
//       .get(`${process.env.customKey}/subcourse/${parseInt(params.programs_id)}/${parseInt(params.sub)}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "X-Access-Token": req.cookies.UT,
//         },
//       })
//       .then((res) => res.data);

//     const result2 = await axios
//       .get(`${process.env.customKey}/courseById/${parseInt(params.programs_id)}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "X-Access-Token": req.cookies.UT,
//         },
//       })
//       .then((res) => res.data.course)
//       .catch((err) => {
//         //console.log(err);
//         return null;
//       });
//     return {
//       props: {
//         CoursecArr: result,
//         SubCourseArr: data,
//         CourseByIdArray: result2,
//         isPurchased: result.isPurchased || null,
//         programs_id: params.programs_id,
//         Lang: params.Lang.toLowerCase(),
//         sub_id: params.sub,
//         error: false,
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         CoursecArr: null,
//         SubCourseArr: null,
//         CourseByIdArray: null,
//         programs_id: params.programs_id,
//         Lang: params.Lang.toLowerCase(),
//         sub_id: params.sub,
//         error: true,
//         error_status: err?.response?.status,
//         error_Text: err?.response?.data?.message === undefined ? null : err?.response?.data?.message,
//       },
//     };
//   }
// }
