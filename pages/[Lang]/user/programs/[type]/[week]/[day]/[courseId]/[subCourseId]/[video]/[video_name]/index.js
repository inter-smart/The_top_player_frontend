// import VideoCard from "@/components/layouts/VideoCard";
// import { getVideo, videos_in_days, watchedVideo } from "@/store/CourcesSlice";
import styles from "@/styles/Profile.module.scss";
// import { useEffect, useRef, useState } from "react";
// import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

// import ReactPlayer from "react-player";
// import { useDispatch, useSelector } from "react-redux";
// import { Player } from "video-react";
import dynamic from "next/dynamic";
// import VideoShow from "@/components/layouts/VideoShow";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LangWrap from "@/components/layouts/LangWarp";
// import Cookies from "js-cookie";
const VideoCard = dynamic(() => import("@/components/layouts/VideoCard"), {
  loading: () => <></>,
  ssr: false,
});
const VideoShow = dynamic(() => import("@/components/layouts/VideoShow"), {
  loading: () => <></>,
  ssr: false,
});
const Videos = ({
  video_id,
  week_id,
  type,
  day_id,
  courseId,
  subCourseId,
  Lang,
  videos,
  video_name,
  error,
  error_status,
  error_Text,
}) => {
  // const dispatch = useDispatch();
  // const { videos } = useSelector((state) => state.CourcesSlice);
  // console.log(
  //   `Lang : ${Lang} - type: ${type} - week : ${week_id} -  day : ${day_id} - courseId: ${courseId} - subCourseId : ${subCourseId} - videId : ${video_id}`
  // );
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (error_status === 401) {
      Cookies.remove("UT");
      router.push(`/${Lang}`);
    } else if (error) {
      router.push(`/${Lang}/error-handel/${error_Text}`);
    }
  }, [error, Lang, router, error_status, error_Text]);

  const video = videos.filter((ele) => ele.id === parseInt(video_id))[0];
  const video_key = videos.indexOf(video);
  const Next_video = videos.filter((ele, key) => key === video_key + 1)[0];
  // const Next_key = videos.indexOf(Next_video);
  // console.log(video );
  // console.log(Next_video );
  // console.log(Next_video?.id)

  return (
    <LangWrap Lang={Lang}>
      <div
        className="container-xxl"
        style={{
          direction: Lang === "ar" ? "rtl" : "ltr",
        }}
      >
        <div className={`${styles.videos} ${Lang === "ar" ? "ar_Video" : "en_Video"}`}>
          <div className={styles.Main_header}>
            <div className={`breadCramp ${Lang === "ar" ? "Ar_cramp" : "En_cramp"}`}>
              <Link href={`/${Lang}`} style={{textDecoration:"none"}}>{t("menu.home")}</Link>
              <span>{" > "}</span>
              <Link href={`/${Lang}/user/programs/details/${courseId}`}>
                {/* {type} */}
                {parseInt(courseId) === 1 && t("programs_details.fitness.title")}
                {parseInt(courseId) === 2 && t("programs_details.fitness_fottboll.title")}
                {parseInt(courseId) === 3 && t("programs_details.football.title")}
              </Link>
            </div>
            <h2 className="title"> {video_name}</h2>
            <div className={styles.week}>
              <div className={styles.day_finish}>
                <h3>
                  {t("vidoe.week")} {week_id} -{" "}
                </h3>

                <h3>
                  &nbsp; {t("vidoe.day")} {day_id % 5 === 0 ? 5 : day_id % 5}
                </h3>
              </div>
              {/* <p className={styles.head_phar}>
              Your first plan will be created for 30 days and displayed in your
              calendar
            </p> */}
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="col-md-8">
              <div className={styles.Main_Video}>
                <VideoShow
                  video_key={video_key}
                  video_id={video_id}
                  courseId={courseId}
                  list={videos?.length}
                  type={type}
                  week_id={week_id}
                  day_id={day_id}
                  subCourseId={subCourseId}
                  Lang={Lang}
                  video_name={video_name}
                  next_name={Next_video?.name}
                  next_id={Next_video?.id}
                />
              </div>
              {/* <div className={styles.Main_Video_mobile}>
              <h1 className="title">Prefect Lower body</h1>
              <div className={styles.week}>
                <div className={styles.day_finish}>
                  <h3>Week {week_id} - </h3>

                  <h3>&nbsp; Day {day_id}</h3>
                </div>
                <p className={styles.head_phar}>
                  Your first plan will be created for 30 days and displayed in
                  your calendar
                </p>
              </div>
            </div> */}
            </div>
            <div className="col-md-4">
              <div className="row">
                {videos &&
                  videos.map((ele, idx) => {
                    return (
                      <div key={ele.id} className="col-12">
                        <VideoCard
                          key={idx}
                          type={type}
                          id={ele.id}
                          name={ele.name}
                          active={ele.watched}
                          courseId={courseId}
                          week_id={week_id}
                          day_id={day_id}
                          subCourseId={subCourseId}
                          Lang={Lang}
                          videoURL={ele.videoURL}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LangWrap>
  );
};

export default Videos;

export async function getServerSideProps({ req, params }) {
  try {
    const result = await axios
      .get(`${process.env.customKey}/videos/${params.courseId}/${params.subCourseId}/${params.day}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": req.cookies.UT,
          // params: data,
        },
      })
      .then((res) => res.data);
    return {
      props: {
        videos: result,
        week_id: params.week,
        day_id: params.day,
        type: params.type,
        subCourseId: params.subCourseId,
        courseId: params.courseId,
        video_id: params.video,
        Lang: params.Lang.toLowerCase(),
        video_name: params.video_name,
      },
    };
  } catch (err) {
    return {
      props: {
        videos: result,
        week_id: params.week,
        day_id: params.day,
        type: params.type,
        subCourseId: params.subCourseId,
        courseId: params.courseId,
        video_id: params.video,
        Lang: params.Lang.toLowerCase(),
        video_name: params.video_name,
        error: true,
        error_status: err?.response?.status,
        error_Text: err?.response?.data?.message === undefined ? null : err?.response?.data?.message,
      },
    };
  }
}
