import Image from "next/legacy/image";
import styles from "@/styles/Programs.module.css";
import { GiTrophyCup } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { useRouter } from "next/router";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
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
const FitnessFottball = dynamic(() => import("@/components/programs/FitnessFootball"), {
  loading: () => <></>,
  ssr: false,
});
const FootballProgram = dynamic(() => import("@/components/programs/Football"), {
  loading: () => <></>,
  ssr: false,
});
const Personlized = dynamic(() => import("@/components/programs/Personlized"), {
  loading: () => <></>,
  ssr: false,
});
const Fitness = ({ programs_id, Lang, CoursecArr, CourseByIdArray, isPurchased }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const expired = CoursecArr ? isExpired(CoursecArr?.endDate) : false;

  const daysFinished = CoursecArr?.subCourses[0]?.finished_days?.length;
  const weeksFinished = CoursecArr?.subCourses[0]?.finished_weeks?.length * 2;
  const AllDays_finished = daysFinished + weeksFinished;

  return (
    <LangWrap Lang={Lang}>
      <InnerBanner
        // imageUrl={"/images/banner-program.jpg"}
        imageUrl={`${process.env.customKey}/courseImages/${CourseByIdArray?.bannerUrl}`}
        title={CourseByIdArray?.name}
        title_ar={CourseByIdArray?.name_arabic}
        Lang={Lang}
      />
      {CoursecArr?.subCourses?.length > 1 && (
        <div className={styles.sub_course} style={{ marginTop: "15px" }}>
          {CoursecArr?.subCourses.map((ele) => {
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
          styles={styles}
          expired={expired}
          Lang={Lang}
          CoursecArr={CoursecArr}
          programsId={programs_id}
        />
      )}

      {/* {CoursecArr?.subCourses?.length < 2 && (
        <>
          {parseInt(programs_id) === 1 && <FitnessProgram styles={styles} Lang={Lang} />}

          {parseInt(programs_id) === 2 && <FitnessFottball styles={styles} Lang={Lang} />}

          {parseInt(programs_id) === 3 && <FootballProgram styles={styles} Lang={Lang} />}
        </>
      )} */}

      {/* {CoursecArr?.subCourses?.length >= 2 && (
        <>{parseInt(CoursecArr.subCourses[0].id) === 2 && <FitnessProgram styles={styles} Lang={Lang} />}</>
      )} */}

      <Personlized Lang={Lang} videoUrl={CourseByIdArray?.videoUrl} />

      {/* {!CoursecArr || expired ? (
        <TrainingVideo Lang={Lang} CourseByIdArray={CourseByIdArray} />
      ) : null} */}

      {/* {CoursecArr && (
        <div className={styles.enrolled_section}>
          <div className={"container"}>
            <div className={styles.days}>
              <div
                className={`${styles.day_finish} ${
                  Lang === "ar" ? styles.Ar_day_finish : ""
                }`}
              >
                {CoursecArr && <h3>{AllDays_finished || 0}/28</h3>}
                <p>{t("programs_details.finish")}</p>
              </div>
              {CoursecArr && !expired && (
                <h3 className="En_num">
                  {parseInt((AllDays_finished / 28) * 100) || 0}%
                </h3>
              )}
            </div>

            {CoursecArr && (
              <div
                className={`${styles.progress_week_grid} ${
                  Lang === "ar" ? styles.Ar_rotate : ""
                }`}
              >
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div
                      className={`${
                        CoursecArr?.subCourses[0]?.finished_days.includes(5)
                          ? styles.circel
                          : styles.not_circel
                      }`}
                    >
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
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/1/1/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(1)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          1
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/1/2/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(2)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          2
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/1/3/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(3)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          3
                        </Link>
                      </div>
                      <div className={styles.days_number}>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/1/4/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(4)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          4
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/1/5/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(5)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          5
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <span
                          className={`${styles.cup} ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(5)
                              ? styles.cup_active
                              : styles.not_active
                          } `}
                        >
                          <GiTrophyCup />
                        </span>
                      </div>
                      <Link
                        className={styles.start_btn}
                        href={`/${Lang}/user/programs/${CoursecArr?.name}/1/1/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                        // onClick={() => router.push("/user/programs/fitness/1/1/1")}
                      >
                        {" "}
                        {t(
                          CoursecArr?.subCourses[0]?.finished_weeks.includes(1)
                            ? "programs_details.completed"
                            : "programs_details.start"
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div
                      className={`${
                        CoursecArr?.subCourses[0]?.finished_days.includes(10)
                          ? styles.circel
                          : styles.not_circel
                      }`}
                    >
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
                    <div className={styles.time_line}>
                      <div className={styles.days_number}>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/2/6/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(6)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          1
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/2/7/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(7)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          2
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/2/8/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(8)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          3
                        </Link>
                      </div>
                      <div className={styles.days_number}>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/2/9/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(9)
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          4
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/2/10/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              10
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          5
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <span
                          className={`${styles.cup} ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              10
                            )
                              ? styles.cup_active
                              : styles.not_active
                          } `}
                        >
                          <GiTrophyCup />
                        </span>
                      </div>
                      <Link
                        className={styles.start_btn}
                        href={`/${Lang}/user/programs/${CoursecArr?.name}/2/6/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                      >
                        {" "}
                        {t(
                          CoursecArr?.subCourses[0]?.finished_weeks.includes(2)
                            ? "programs_details.completed"
                            : "programs_details.start"
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div
                      className={`${
                        CoursecArr?.subCourses[0]?.finished_days.includes(15)
                          ? styles.circel
                          : styles.not_circel
                      }`}
                    >
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
                    <div className={styles.time_line}>
                      <div className={styles.days_number}>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/3/11/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              11
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          1
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/3/12/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              12
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          2
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/3/13/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              13
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          3
                        </Link>
                      </div>
                      <div className={styles.days_number}>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/3/14/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              14
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          4
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/3/15/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              15
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          5
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <span
                          className={`${styles.cup} ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              15
                            )
                              ? styles.cup_active
                              : styles.not_active
                          } `}
                        >
                          <GiTrophyCup />
                        </span>
                      </div>
                      <Link
                        className={styles.start_btn}
                        href={`/${Lang}/user/programs/${CoursecArr?.name}/3/11/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                      >
                        {t(
                          CoursecArr?.subCourses[0]?.finished_weeks.includes(3)
                            ? "programs_details.completed"
                            : "programs_details.start"
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={styles.progress_week}>
                  <div className={styles.line}>
                    <div
                      className={`${
                        CoursecArr?.subCourses[0]?.finished_days.includes(20)
                          ? styles.circel
                          : styles.not_circel
                      }`}
                    >
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
                    <div className={styles.time_line}>
                      <div className={styles.days_number}>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/4/16/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              16
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          1
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/4/17/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              17
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          2
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/4/18/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              18
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          3
                        </Link>
                      </div>
                      <div className={styles.days_number}>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/4/19/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              19
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          4
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <Link
                          href={`/${Lang}/user/programs/${CoursecArr?.name}/4/20/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                          className={` ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              20
                            )
                              ? styles.active
                              : styles.not_active
                          } `}
                        >
                          5
                        </Link>
                        <span>
                          <MdArrowForwardIos />
                        </span>
                        <span
                          className={`${styles.cup} ${
                            CoursecArr?.subCourses[0]?.finished_days.includes(
                              20
                            )
                              ? styles.cup_active
                              : styles.not_active
                          } `}
                        >
                          <GiTrophyCup />
                        </span>
                      </div>
                      <Link
                        className={styles.start_btn}
                        href={`/${Lang}/user/programs/${CoursecArr?.name}/4/16/${CoursecArr?.id}/${CoursecArr?.subCourses?.[0]?.id}`}
                      >
                        {t(
                          CoursecArr?.subCourses[0]?.finished_weeks.includes(4)
                            ? "programs_details.completed"
                            : "programs_details.start"
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )} */}

      {/* <Testimonials Lang={Lang} programId={programs_id} /> */}

      {(!isPurchased || expired) && (
        <EnrollProgram Lang={Lang} programId={programs_id} CoursecArr={CoursecArr} expired={expired} CourseByIdArray={CourseByIdArray} />
      )}
    </LangWrap>
  );
};

export default Fitness;

export async function getServerSideProps({ req, params }) {
  // Centralized function to fetch data
  const getData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": req.cookies.UT,
        },
      });
      return response?.data;
    } catch (err) {
      //console.log(err?.response?.data?.message);
      return null;
    }
  };

  const programId = parseInt(params.programs_id);

  try {
    // Fetch both endpoints concurrently
    const [result, result2] = await Promise.all([
      getData(`${process.env.customKey}/course/${programId}`),
      getData(`${process.env.customKey}/courseById/${programId}`),
    ]);

    console.log("props data", result);
    console.log("props data", result?.isPurchased);
    console.log("props data", result2);

    return {
      props: {
        CoursecArr: result,
        CourseByIdArray: result2?.course || null,
        isPurchased: result?.isPurchased,
        programs_id: params.programs_id,
        Lang: params.Lang.toLowerCase(),
        error: false,
        error_status: null,
      },
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      props: {
        CoursecArr: null,
        CourseByIdArray: null,
        programs_id: params.programs_id,
        Lang: params.Lang.toLowerCase(),
        error: true,
        error_status: err?.response?.status || 500,
        error_Text: err?.response?.data?.message || "Unknown error occurred",
      },
    };
  }
}
