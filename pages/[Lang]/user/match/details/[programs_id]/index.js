import styles from "@/styles/Programs.module.css";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import LangWrap from "@/components/layouts/LangWarp";
import InnerBanner from "@/components/layouts/InnerBanner";
import isExpired from "@/helpers/checkExpired";
import MatchCongrats from "@/components/programs/MatchCongrats";
import CongratsBox from "@/components/programs/CongratzBox";

const ProgramCard = dynamic(() => import("@/components/programs/ProgramCard"), {
  loading: () => <></>,
  ssr: false,
});

const Personlized = dynamic(() => import("@/components/programs/Personlized"), {
  loading: () => <></>,
  ssr: false,
});
const Match = ({ programs_id, Lang, CoursecArr, CourseByIdArray }) => {
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

      {(!CoursecArr || expired) && (
        <ProgramCard
          programDetails={CourseByIdArray}
          styles={styles}
          expired={expired}
          Lang={Lang}
          CoursecArr={CoursecArr}
          programsId={programs_id}
        />
      )}

      {CoursecArr && !expired &&  (
       <CongratsBox  Lang={Lang} type={"match"}/>
      )}
      {(!CoursecArr || expired) &&  <Personlized Lang={Lang} videoUrl={CourseByIdArray?.videoUrl} CoursecArr={CoursecArr} expired={expired} />}
      {(!CoursecArr || expired) && (
        <>
          <MatchCongrats
            Lang={Lang}
            programId={programs_id}
            CoursecArr={CoursecArr}
            expired={expired}
            CourseByIdArray={CourseByIdArray}
            type={"match"}
          />
        </>
      )}


    </LangWrap>
  );
};

export default Match;

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

    return {
      props: {
        CoursecArr: result,
        CourseByIdArray: result2?.course || null,
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
