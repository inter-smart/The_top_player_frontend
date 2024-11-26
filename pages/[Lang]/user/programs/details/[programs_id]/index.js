import styles from "@/styles/Programs.module.css";
import { RiLock2Line } from "react-icons/ri";
import { GiTrophyCup } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { useRouter } from "next/router";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import LangWrap from "@/components/layouts/LangWarp";
import InnerBanner from "@/components/layouts/InnerBanner";
import TrainingVideo from "@/components/programs/TrainingVideo";
import Testimonials from "@/components/programs/Testimonials";
import EnrollProgram from "@/components/programs/EnrollProgram";
import { courseById } from "@/store/CourcesSlice";
import isExpired from "@/helpers/checkExpired";

const FitnessProgram = dynamic(() => import("@/components/programs/Fitness"), {
  loading: () => <></>,
  ssr: false,
});
const ProgramCard = dynamic(() => import("@/components/programs/ProgramCard"), {
  loading: () => <></>,
  ssr: false,
});

const Personlized = dynamic(() => import("@/components/programs/Personlized"), {
  loading: () => <></>,
  ssr: false,
});
const Personlized2 = dynamic(() => import("@/components/programs/Personalized2"), {
  loading: () => <></>,
  ssr: false,
});

const Fitness = ({ programs_id, Lang, CoursecArr, CourseByIdArray, isPurchased }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toast = useRef(null);
  const targetDivRef = useRef(null);

  const expired = CoursecArr ? isExpired(CoursecArr?.endDate) : false;

  const user_info = useSelector((state) => state.AuthSlice.user_info);

  const isLoggedIn = user_info ? true : false;

  const daysFinished = CoursecArr?.subCourses[0]?.finished_days?.length;
  const weeksFinished = CoursecArr?.subCourses[0]?.finished_weeks?.length * 2;
  const AllDays_finished = daysFinished + weeksFinished;

  console.log("WATCHED DETAILS",daysFinished)
  console.log("WATCHED DETAILS",weeksFinished)
  console.log("WATCHED DETAILS",weeksFinished)
  console.log("WATCHED DETAILS",CoursecArr?.subCourses[0])

  const freeCheck = CourseByIdArray?.id == process.env.FREE_COURSE_ID ? isLoggedIn && CoursecArr : isLoggedIn && CoursecArr && !expired;

  const scrollToDiv = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleClick = (week, day) => {
    if (day == 1) {
      const url = `/${Lang}/user/programs/${CoursecArr?.name}/${week}/${day}/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`;
      router.push(url);
      return;
    }
    if (isPurchased) {
      const url = expired
        ? `/${Lang}/user/payment/${CoursecArr?.id}`
        : `/${Lang}/user/programs/${CoursecArr?.name}/${week}/${day}/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`;
      router.push(url);
    } else {
      router.push(`/${Lang}/user/payment/${CoursecArr?.id}`);
    }
  };

  return (
    <LangWrap Lang={Lang}>
      <Toast ref={toast} position="top-center" />
      <InnerBanner
        // imageUrl={"/images/banner-program.jpg"}
        imageUrl={`${process.env.customKey}/courseImages/${CourseByIdArray?.bannerUrl}`}
        title={CourseByIdArray?.name}
        title_ar={CourseByIdArray?.name_arabic}
        Lang={Lang}
      />
      {CoursecArr?.subCourses?.length > 1 && (
        <div className={styles.sub_course} style={{ marginTop: "15px" }}>
          {CoursecArr?.subCourses?.map((ele) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                key={ele.id}
                className={`${ele.id === CoursecArr?.subCourses[0].id ? styles.active : ""} ${
                  Lang === "ar" ? styles.Ar_subCourses_Link : styles.En_subCourses_Link
                }`}
                href={`/${Lang}/user/programs/details/${CoursecArr.id}/sub/${ele.id}`}
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

      {!isPurchased || expired ? <Personlized Lang={Lang} videoUrl={CourseByIdArray?.videoUrl} /> : <Personlized2 Lang={Lang} styles={styles} />}

      {freeCheck && (
        <div className={styles.enrolled_section}>
          <div className={"container"}>
            <div className={styles.days}>
              <div className={`${styles.day_finish} ${Lang === "ar" ? styles.Ar_day_finish : ""}`}>
                {CoursecArr && <h3>{AllDays_finished || 0}/28</h3>}
                <p>{t("programs_details.finish")}</p>
              </div>
              {CoursecArr && !expired && <h3 className="En_num">{parseInt((AllDays_finished / 28) * 100) || 0}%</h3>}
            </div>

            {isLoggedIn && CoursecArr && (
              <div className={`${styles.progress_week_grid} ${Lang === "ar" ? styles.Ar_rotate : ""}`}>
                <div className={styles.progress_week} ref={targetDivRef}>
                  <div className={styles.line}>
                    <div className={`${CoursecArr?.subCourses[0]?.finished_days.includes(5) ? styles.circel : styles.not_circel}`}>
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
                    <div className={styles.time_line_1}>
                      <div className={styles.days_number}>
                        <div
                          onClick={() => handleClick(1, 1)}
                          className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(1) ? styles.active : styles.not_active} `}
                        >
                          1
                        </div>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <div
                          onClick={() => handleClick(1, 2)}
                          className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(2) ? styles.active : styles.not_active} `}
                        >
                          {isPurchased ? expired ? <RiLock2Line /> : 2 : <RiLock2Line />}
                        </div>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <div
                          onClick={() => handleClick(1, 3)}
                          className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(3) ? styles.active : styles.not_active} `}
                        >
                          {isPurchased ? expired ? <RiLock2Line /> : 3 : <RiLock2Line />}
                        </div>
                      </div>
                      <div className={styles.days_number}>
                        <div
                          onClick={() => handleClick(1, 4)}
                          className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(4) ? styles.active : styles.not_active} `}
                        >
                          {isPurchased ? expired ? <RiLock2Line /> : 4 : <RiLock2Line />}{" "}
                        </div>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <div
                          onClick={() => handleClick(1, 5)}
                          className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(5) ? styles.active : styles.not_active} `}
                        >
                          {isPurchased ? expired ? <RiLock2Line /> : 5 : <RiLock2Line />}
                        </div>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <span
                          className={`${styles.cup} ${CoursecArr?.subCourses[0]?.finished_days.includes(5) ? styles.cup_active : styles.not_active} `}
                        >
                          <GiTrophyCup />
                        </span>
                      </div>
                      <div onClick={() => handleClick(1, isPurchased ? (expired ? 0 : 1) : 0)} className={styles.start_btn}>
                        {" "}
                        {t(CoursecArr?.subCourses[0]?.finished_weeks.includes(1) ? "programs_details.completed" : "programs_details.start")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div className={`${CoursecArr?.subCourses[0]?.finished_days.includes(10) ? styles.circel : styles.not_circel}`}>
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
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(6) ? styles.active : styles.not_active} `}
                          >
                            1
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(2, 7)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(7) ? styles.active : styles.not_active} `}
                          >
                            2
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(2, 8)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(8) ? styles.active : styles.not_active} `}
                          >
                            3
                          </div>
                        </div>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(2, 9)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(9) ? styles.active : styles.not_active} `}
                          >
                            4
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(2, 10)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(10) ? styles.active : styles.not_active} `}
                          >
                            5
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <span
                            className={`${styles.cup} ${
                              CoursecArr?.subCourses[0]?.finished_days.includes(10) ? styles.cup_active : styles.not_active
                            } `}
                          >
                            <GiTrophyCup />
                          </span>
                        </div>
                        <div onClick={() => handleClick(2, 6)} className={styles.start_btn}>
                          {" "}
                          {t(CoursecArr?.subCourses[0]?.finished_weeks.includes(2) ? "programs_details.completed" : "programs_details.start")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div className={`${CoursecArr?.subCourses[0]?.finished_days.includes(15) ? styles.circel : styles.not_circel}`}>
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
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(11) ? styles.active : styles.not_active} `}
                          >
                            1
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(3, 12)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(12) ? styles.active : styles.not_active} `}
                          >
                            2
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(3, 13)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(13) ? styles.active : styles.not_active} `}
                          >
                            3
                          </div>
                        </div>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(3, 14)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(14) ? styles.active : styles.not_active} `}
                          >
                            4
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(3, 15)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(15) ? styles.active : styles.not_active} `}
                          >
                            5
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <span
                            className={`${styles.cup} ${
                              CoursecArr?.subCourses[0]?.finished_days.includes(15) ? styles.cup_active : styles.not_active
                            } `}
                          >
                            <GiTrophyCup />
                          </span>
                        </div>
                        <div onClick={() => handleClick(3, 11)} className={styles.start_btn}>
                          {t(CoursecArr?.subCourses[0]?.finished_weeks.includes(3) ? "programs_details.completed" : "programs_details.start")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div className={`${CoursecArr?.subCourses[0]?.finished_days.includes(20) ? styles.circel : styles.not_circel}`}>
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
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(16) ? styles.active : styles.not_active} `}
                          >
                            1
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(4, 17)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(17) ? styles.active : styles.not_active} `}
                          >
                            2
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(4, 18)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(18) ? styles.active : styles.not_active} `}
                          >
                            3
                          </div>
                        </div>
                        <div className={styles.days_number}>
                          <div
                            onClick={() => handleClick(4, 19)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(19) ? styles.active : styles.not_active} `}
                          >
                            4
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <div
                            onClick={() => handleClick(4, 20)}
                            className={` ${CoursecArr?.subCourses[0]?.finished_days.includes(20) ? styles.active : styles.not_active} `}
                          >
                            5
                          </div>
                          <span>
                            <MdArrowForwardIos />
                          </span>
                          <span
                            className={`${styles.cup} ${
                              CoursecArr?.subCourses[0]?.finished_days.includes(20) ? styles.cup_active : styles.not_active
                            } `}
                          >
                            <GiTrophyCup />
                          </span>
                        </div>
                        <div onClick={() => handleClick(4, 16)} className={styles.start_btn}>
                          {t(CoursecArr?.subCourses[0]?.finished_weeks.includes(4) ? "programs_details.completed" : "programs_details.start")}
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

      {!isPurchased && <Testimonials Lang={Lang} programId={programs_id} />}

      {(!CoursecArr || expired) && (
        <EnrollProgram Lang={Lang} programId={programs_id} CoursecArr={CoursecArr} expired={expired} CourseByIdArray={CourseByIdArray} />
      )}
    </LangWrap>
  );
};

export default Fitness;

export async function getServerSideProps({ req, params }) {
  const getData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": req.cookies.UT,
        },
      });

      console.log("response", response);

      return response?.data;
    } catch (err) {
      console.log(err);

      return null;
    }
  };

  const programId = parseInt(params.programs_id);
  const customKey = process.env.customKey;

  const [courseById, course] = await Promise.all([getData(`${customKey}/courseById/${programId}`), getData(`${customKey}/course/${programId}`)]);

  const errorStatus = course ? false : true;

  console.log("course", course);

  return {
    props: {
      CoursecArr: course,
      isPurchased: course?.isPurchased || null,
      CourseByIdArray: courseById ? courseById.course : null,
      programs_id: params.programs_id,
      Lang: params.Lang.toLowerCase(),
      error: errorStatus,
      error_status: course ? null : 500, // Example status, change as needed
      error_Text: course ? null : "Error retrieving data",
    },
  };
}
