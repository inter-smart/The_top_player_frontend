import Image from "next/legacy/image";
import styles from "@/styles/Programs.module.css";
import { FaDumbbell } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { useRouter } from "next/router";
// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { getCources, getSubCources } from "@/store/CourcesSlice";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import axios from "axios";
import dynamic from "next/dynamic";
import LangWrap from "@/components/layouts/LangWarp";
import InnerBanner from "@/components/layouts/InnerBanner";
import Testimonials from "@/components/programs/Testimonials";
import isExpired from "@/helpers/checkExpired";
import { useSelector } from "react-redux";
import { RiLock2Line } from "react-icons/ri";
import ProgramCard from "@/components/programs/ProgramCard";

const Personlized = dynamic(() => import("@/components/programs/Personalized2"), {
  loading: () => <></>,
  ssr: false,
});
const Fitness = ({ programs_id, CourseByIdArray, Lang, sub_id, CoursecArr, SubCourseArr, isPurchased, error, error_status, error_Text }) => {
  const router = useRouter();
  // const dispatch = useDispatch();
  const { t } = useTranslation();
  const targetDivRef = useRef(null);
  useEffect(() => {
    if (error_status === 401) {
      Cookies.remove("UT");
      router.push(`/${Lang}`);
    } else if (error) {
      router.push(`/${Lang}/error-handel/${error_Text}`);
    }
  }, [error, Lang, router, error_status, error_Text]);

  const expired = SubCourseArr ? isExpired(CoursecArr?.endDate) : false;

  const user_info = useSelector((state) => state.AuthSlice.user_info);

  const isLoggedIn = user_info ? true : false;

  const scrollToDiv = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const daysFinished = SubCourseArr?.finished_days?.length;
  const weeksFinished = SubCourseArr?.finished_weeks?.length * 2;
  const AllDays_finished = daysFinished + weeksFinished;
  // console.log(AllDays_finished)

  console.log("value", expired);

  const handleClick = (week, day) => {
    if (day == 1) {
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
  };

  return (
    <LangWrap Lang={Lang}>
      <InnerBanner
        imageUrl={`${process.env.customKey}/courseImages/${CourseByIdArray?.bannerUrl}`}
        title={CourseByIdArray?.name}
        title_ar={CourseByIdArray?.name_arabic}
        Lang={Lang}
      />
      {CoursecArr?.subCourses?.length > 1 && (
        <div className={styles.sub_course} style={{ marginTop: "15px" }}>
          {CoursecArr?.subCourses?.map((ele) => {
            {
              console.log("ele", ele);
            }
            return (
              <Link
                key={ele.id}
                className={`${ele.id === parseInt(sub_id) ? styles.active : ""}
                  
                  ${Lang === "ar" ? styles.Ar_subCourses_Link : styles.En_subCourses_Link}`}
                href={`/${Lang}/user/programs/details/${programs_id}/sub/${ele.id}
                  
                  `}
              >
                {Lang === "en" && ele.name}
                {Lang === "ar" && ele.name === "fitness Program" && "برنامج اللياقة"}
                {Lang === "ar" && ele.name === "football Program" && "برنامج كرة القدم"}
              </Link>
            );
          })}
        </div>
      )}

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
      {isLoggedIn && CoursecArr && (
        <div className={styles.enrolled_section}>
          <div className={"container"}>
            <div className={styles.days}>
              <div className={`${styles.day_finish} ${Lang === "ar" ? styles.Ar_day_finish : ""}`}>
                {/* <h3>0/20</h3> */}
                {CoursecArr && <h3>{AllDays_finished || 0}/28</h3>}
                <p>{t("programs_details.finish")}</p>
              </div>
              {CoursecArr && <h3 className="En_num">{parseInt((AllDays_finished / 28) * 100) || 0}%</h3>}
            </div>
            {isLoggedIn && CoursecArr && (
              <div className={`${styles.progress_week_grid} ${Lang === "ar" ? styles.Ar_rotate : ""}`}>
                <div className={styles.progress_week} ref={targetDivRef}>
                  <div className={styles.line}>
                    <div className={` ${SubCourseArr.finished_days?.includes(5) ? styles.circel : styles.not_circel} `}>
                      <FaStar />
                    </div>
                    <span></span>
                  </div>
                  <div className={styles.mobile_grid}>
                    <div className={styles.progress_info}>
                      <h4>
                        {t("programs_details.weeks.week1")}
                        <span className="En_num">1</span>
                      </h4>
                    </div>
                    <div className={styles.time_line}>
                      <div className={styles.days_number}>
                        <div
                          onClick={() => handleClick(1, 1)}
                          className={` ${SubCourseArr.finished_days?.includes(1) ? styles.active : styles.not_active} `}
                        >
                          1
                        </div>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <div
                          onClick={() => handleClick(1, 2)}
                          className={` ${SubCourseArr.finished_days?.includes(2) ? styles.active : styles.not_active} `}
                        >
                          {isPurchased ? expired ? <RiLock2Line /> : 2 : <RiLock2Line />}
                        </div>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <div
                          onClick={() => handleClick(1, 3)}
                          className={` ${SubCourseArr.finished_days?.includes(3) ? styles.active : styles.not_active} `}
                        >
                          {isPurchased ? expired ? <RiLock2Line /> : 3 : <RiLock2Line />}
                        </div>
                      </div>
                      <div className={styles.days_number}>
                        <div
                          onClick={() => handleClick(1, 4)}
                          className={` ${SubCourseArr.finished_days?.includes(4) ? styles.active : styles.not_active} `}
                        >
                          {isPurchased ? expired ? <RiLock2Line /> : 4 : <RiLock2Line />}
                        </div>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <div
                          onClick={() => handleClick(1, 5)}
                          className={` ${SubCourseArr.finished_days?.includes(5) ? styles.active : styles.not_active} `}
                        >
                          {isPurchased ? expired ? <RiLock2Line /> : 5 : <RiLock2Line />}
                        </div>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <span className={`${styles.cup} ${SubCourseArr.finished_days?.includes(5) ? styles.cup_active : styles.not_active} `}>
                          <GiTrophyCup />
                        </span>
                      </div>
                      <div className={styles.start_btn} onClick={() => handleClick(1, 1)}>
                      {t(SubCourseArr?.finished_weeks.includes(1) ? "programs_details.completed" : "programs_details.start")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div className={` ${SubCourseArr.finished_days?.includes(10) ? styles.circel : styles.not_circel} `}>
                      <FaStar />
                    </div>
                    <span></span>
                  </div>

                  <div className={styles.mobile_grid}>
                    <div className={styles.progress_info}>
                      <h4>
                        {t("programs_details.weeks.week2")}
                        <span className="En_num">2</span>
                      </h4>
                    </div>
                    <div className={styles.icon_parent}>
                      {isPurchased ? (
                        expired ? (
                          <div className={styles.lock_icon}>
                            <RiLock2Line onClick={() => handleClick(0, 0)} />
                          </div>
                        ) : null
                      ) : (
                        <div className={styles.lock_icon}>
                          <RiLock2Line onClick={() => handleClick(0, 0)} />
                        </div>
                      )}
                      <div className={`${styles.time_line} ${isPurchased ? (expired ? styles.disabled : "") : styles.disabled}`}>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(2, 6)}
                            className={` ${SubCourseArr.finished_days?.includes(6) ? styles.active : styles.not_active} `}
                          >
                            1
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(2, 7)}
                            className={` ${SubCourseArr.finished_days?.includes(7) ? styles.active : styles.not_active} `}
                          >
                            2
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(2, 8)}
                            className={` ${SubCourseArr.finished_days?.includes(8) ? styles.active : styles.not_active} `}
                          >
                            3
                          </div>
                        </div>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(2, 9)}
                            className={` ${SubCourseArr.finished_days?.includes(9) ? styles.active : styles.not_active} `}
                          >
                            4
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(2, 10)}
                            className={` ${SubCourseArr.finished_days?.includes(10) ? styles.active : styles.not_active} `}
                          >
                            5
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <span className={`${styles.cup} ${SubCourseArr.finished_days?.includes(10) ? styles.cup_active : styles.not_active} `}>
                            <GiTrophyCup />
                          </span>
                        </div>
                        <div className={styles.start_btn} onClick={() => handleClick(2, 6)}>
                          {" "}
                          {t("programs_details.start")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div className={` ${SubCourseArr.finished_days?.includes(15) ? styles.circel : styles.not_circel} `}>
                      <FaStar />
                    </div>
                    <span></span>
                  </div>

                  <div className={styles.mobile_grid}>
                    <div className={styles.progress_info}>
                      <h4>
                        {t("programs_details.weeks.week3")}
                        <span className="En_num">3</span>
                      </h4>
                    </div>
                    <div className={styles.icon_parent}>
                      {isPurchased ? (
                        expired ? (
                          <div className={styles.lock_icon}>
                            <RiLock2Line onClick={() => handleClick(0, 0)} />
                          </div>
                        ) : null
                      ) : (
                        <div className={styles.lock_icon}>
                          <RiLock2Line onClick={() => handleClick(0, 0)} />
                        </div>
                      )}
                      <div className={`${styles.time_line} ${isPurchased ? (expired ? styles.disabled : "") : styles.disabled}`}>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(3, 11)}
                            className={` ${SubCourseArr.finished_days?.includes(11) ? styles.active : styles.not_active} `}
                          >
                            1
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(3, 12)}
                            className={` ${SubCourseArr.finished_days?.includes(12) ? styles.active : styles.not_active} `}
                          >
                            2
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(3, 13)}
                            className={` ${SubCourseArr.finished_days?.includes(13) ? styles.active : styles.not_active} `}
                          >
                            3
                          </div>
                        </div>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(3, 14)}
                            className={` ${SubCourseArr.finished_days?.includes(14) ? styles.active : styles.not_active} `}
                          >
                            4
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(3, 15)}
                            className={` ${SubCourseArr.finished_days?.includes(15) ? styles.active : styles.not_active} `}
                          >
                            5
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <span className={`${styles.cup} ${SubCourseArr.finished_days?.includes(15) ? styles.cup_active : styles.not_active} `}>
                            <GiTrophyCup />
                          </span>
                        </div>
                        <div className={styles.start_btn} onClick={() => handleClick(3, 11)}>
                          {" "}
                          {t("programs_details.start")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div className={` ${SubCourseArr.finished_days?.includes(20) ? styles.circel : styles.not_circel} `}>
                      <FaStar />
                    </div>
                    <span></span>
                  </div>
                  <div className={styles.mobile_grid}>
                    <div className={styles.progress_info}>
                      <h4>
                        {t("programs_details.weeks.week4")}
                        <span className="En_num">4</span>
                      </h4>
                    </div>
                    <div className={styles.icon_parent}>
                      {isPurchased ? (
                        expired ? (
                          <div className={styles.lock_icon}>
                            <RiLock2Line onClick={() => handleClick(0, 0)} />
                          </div>
                        ) : null
                      ) : (
                        <div className={styles.lock_icon}>
                          <RiLock2Line onClick={() => handleClick(0, 0)} />
                        </div>
                      )}

                      <div className={`${styles.time_line} ${isPurchased ? (expired ? styles.disabled : "") : styles.disabled}`}>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(4, 16)}
                            className={` ${SubCourseArr.finished_days?.includes(16) ? styles.active : styles.not_active} `}
                          >
                            1
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(4, 17)}
                            className={` ${SubCourseArr.finished_days?.includes(17) ? styles.active : styles.not_active} `}
                          >
                            2
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(4, 18)}
                            className={` ${SubCourseArr.finished_days?.includes(18) ? styles.active : styles.not_active} `}
                          >
                            3
                          </div>
                        </div>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(4, 19)}
                            className={` ${SubCourseArr.finished_days?.includes(19) ? styles.active : styles.not_active} `}
                          >
                            4
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(4, 20)}
                            className={` ${SubCourseArr.finished_days?.includes(20) ? styles.active : styles.not_active} `}
                          >
                            5
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <span className={`${styles.cup} ${SubCourseArr.finished_days?.includes(20) ? styles.cup_active : styles.not_active} `}>
                            <GiTrophyCup />
                          </span>
                        </div>
                        <div className={styles.start_btn} onClick={() => handleClick(4, 16)}>
                          {" "}
                          {t("programs_details.start")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Testimonials Lang={Lang} programId={programs_id} />
      {/* </div> */}
    </LangWrap>
  );
};

export default Fitness;

export async function getServerSideProps({ req, params }) {
  console.log("params", params);

  try {
    const result = await axios
      .get(`${process.env.customKey}/course/${parseInt(params.programs_id)}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": req.cookies.UT,
        },
      })
      .then((res) => res.data);

    const data = await axios
      .get(`${process.env.customKey}/subcourse/${parseInt(params.programs_id)}/${parseInt(params.sub)}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": req.cookies.UT,
        },
      })
      .then((res) => res.data);

    const result2 = await axios
      .get(`${process.env.customKey}/courseById/${parseInt(params.programs_id)}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": req.cookies.UT,
        },
      })
      .then((res) => res.data.course)
      .catch((err) => {
        console.log(err);
        return null;
      });
    return {
      props: {
        CoursecArr: result,
        SubCourseArr: data,
        CourseByIdArray: result2,
        isPurchased: result.isPurchased || null,
        programs_id: params.programs_id,
        Lang: params.Lang.toLowerCase(),
        sub_id: params.sub,
        error: false,
      },
    };
  } catch (err) {
    return {
      props: {
        CoursecArr: null,
        SubCourseArr: null,
        CourseByIdArray: null,
        programs_id: params.programs_id,
        Lang: params.Lang.toLowerCase(),
        sub_id: params.sub,
        error: true,
        error_status: err?.response?.status,
        error_Text: err?.response?.data?.message === undefined ? null : err?.response?.data?.message,
      },
    };
  }
}
