// import { getVideo, videos_in_days, watchedVideo } from "@/store/CourcesSlice";
// import { useEffect, useRef, useState } from "react";
// import { getCookies, getCookie, setCookies, removeCookies } from "cookies-next";

// import ReactPlayer from "react-player";
// import { useDispatch, useSelector } from "react-redux";
// import { Player } from "video-react";
// import VideoShow from "@/components/layouts/VideoShow";
// import Cookies from "js-cookie";
import VideoCard from "@/components/layouts/VideoCard";
import styles from "@/styles/Profile.module.scss";
import dynamic from "next/dynamic";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";
import LangWrap from "@/components/layouts/LangWarp";
import { useDispatch, useSelector } from "react-redux";
import { videos_in_days } from "@/store/CourcesSlice";
const VideoShow = dynamic(() => import("@/components/layouts/VideoShow"), {
  loading: () => <></>,
  ssr: false,
});
const FristVideos = ({ week_id, type, day_id, courseId, subCourseId, Lang, error, error_status, error_Text }) => {
  const { t } = useTranslation();
  const router = useRouter();

  console.log("ERROR", error_Text);
  console.log("ERROR", error_status);

  useEffect(() => {
    if (error_status === 401) {
      Cookies.remove("UT");
      router.push(`/${Lang}`);
    } else if (error) {
      router.push({
        pathname: `/${Lang}/error-handel/${error_Text}`,
        query: {
          type: "programs",
          courseId,
        },
      });
    }
  }, [error, Lang, router, error_status, error_Text]);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      courseId: courseId,
      subCourseId: subCourseId,
      day: day_id,
      week: week_id,
    };
    //console.log("data =====>", data);
    dispatch(videos_in_days(data));
  }, [dispatch, day_id, courseId, subCourseId]);
  const { videos } = useSelector((state) => state.CourcesSlice);

  console.log("VIDEOSSSSS", videos);

  // //console.log(videos[0]);
  // //console.log(videos[1]);
  const [videoURl, setVideoUrl] = useState(null);
  const [video_key, setVideoKey] = useState({});

  // useEffect(() => {
  //   if (!videoURl) {
  //     setVideoUrl(videos[0]);
  //   }
  // }, [videos, videoURl]);
  // //console.log(videos);

  // const Next_video = videos.filter((ele, key) => key === video_key + 1)[0];

  // //console.log(router.asPath)

  // //console.log()
  const day_time = day_id % 5;
  return (
    <LangWrap Lang={Lang}>
      <div
        className="container-xxl"
        style={{
          direction: Lang === "ar" ? "rtl" : "ltr",
          marginTop: "70px",
        }}
      >
        <div className={`${styles.videos} ${Lang === "ar" ? "ar_Video" : "en_Video"}`}>
          <div className={styles.Main_header}>
            <div className={`breadCramp ${Lang === "ar" ? "Ar_cramp" : "En_cramp"}`}>
              <Link href={`/${Lang}`} style={{ textDecoration: "none" }}>
                {t("menu.home")}
              </Link>
              <span>{" > "}</span>
              <Link href={`/${Lang}/user/programs/details/${courseId}`} style={{ textDecoration: "none" }}>
                {/* {type} */}
                {parseInt(courseId) === 1 && t("programs_details.fitness.title")}
                {parseInt(courseId) === 2 && t("programs_details.fitness_fottboll.title")}
                {parseInt(courseId) === 3 && t("programs_details.football.title")}
              </Link>
            </div>
            {videos && <h2 className="title video_name">{videoURl ? videoURl?.name : videos[0]?.name}</h2>}

            <div className={styles.week}>
              <div className={styles.day_finish}>
                <h3>
                  {" "}
                  {t("vidoe.week")} <span className="En_num">{week_id} - </span>
                </h3>

                <h3>
                  {/* &nbsp; {t("vidoe.day")}{" "} */}
                  {/* {day_time === 0 ? 5 : day_time} */}
                  {parseInt(subCourseId) === 4 || parseInt(subCourseId) === 3 ? (
                    <>
                      <span className="En_num  mx-1">
                        {day_time === 1 && parseInt(subCourseId) === 4 && `${t("vidoe.line1")}`}
                        {day_time === 2 && parseInt(subCourseId) === 4 && `${t("vidoe.line2")}`}
                        {day_time === 3 && parseInt(subCourseId) === 4 && `${t("vidoe.line3")}`}
                        {day_time === 4 && parseInt(subCourseId) === 4 && `${t("vidoe.line4")}`}
                        {day_time === 0 && parseInt(subCourseId) === 4 && `${t("vidoe.line5")}`}
                      </span>
                      <span className="En_num  mx-1">
                        {day_time === 1 && parseInt(subCourseId) === 3 && `${t("vidoe.line1")}`}
                        {day_time === 2 && parseInt(subCourseId) === 3 && `${t("vidoe.line2")}`}
                        {day_time === 3 && parseInt(subCourseId) === 3 && `${t("vidoe.line3")}`}
                        {day_time === 4 && parseInt(subCourseId) === 3 && `${t("vidoe.line4")}`}
                        {day_time === 0 && parseInt(subCourseId) === 3 && `${t("vidoe.line5")}`}
                      </span>
                    </>
                  ) : (
                    <>
                      &nbsp; {t("vidoe.day")} <span className="En_num2">{day_time === 0 ? 5 : day_time}</span>
                    </>
                  )}
                </h3>
              </div>
              {/* <p className={styles.head_phar}>
            {t("vidoe.plan")}
            </p> */}
            </div>
          </div>
          <div className="row justify-content-between">
            {videos && !videoURl && (
              <div className="col-lg-8 col_video_mobile">
                <div className={styles.Main_Video}>
                  <VideoShow
                    key={videos[0]?.id}
                    video_key={1}
                    video_id={videos[0]?.id}
                    courseId={courseId}
                    list={videos?.length}
                    type={type}
                    week_id={week_id}
                    day_id={day_id}
                    subCourseId={subCourseId}
                    Lang={Lang}
                    video_name={videos[0]?.name}
                    video_image={videos[0]?.videoURL}
                    day_time={day_time}
                    // next_name={videos[1]?.name}
                    // next_id={videos[1]?.id}
                  />
                </div>
              </div>
            )}

            {videos && videoURl && (
              <div className="col-lg-8 col_video_mobile">
                <div className={styles.Main_Video}>
                  <VideoShow
                    key={videoURl?.id}
                    video_key={video_key}
                    video_id={videoURl?.id}
                    courseId={courseId}
                    list={videos?.length}
                    type={type}
                    week_id={week_id}
                    day_id={day_id}
                    subCourseId={subCourseId}
                    Lang={Lang}
                    video_name={videoURl?.name}
                    video_image={videoURl.videoURL}
                    day_time={day_time}

                    // next_name={videos[1]?.name}
                    // next_id={videos[1]?.id}
                  />
                </div>
              </div>
            )}

            <div className="col-lg-4">
              <div className="row">
                {videos &&
                  videos.map((ele, idx) => {
                    return (
                      <div key={ele?.id} className="col-12">
                        <VideoCard
                          setVideoKey={(e) => setVideoKey(e)}
                          setVideoUrl={(e) => setVideoUrl(e)}
                          videoURl={videoURl}
                          key={idx}
                          type={type}
                          id={ele?.id}
                          name={ele?.name}
                          active={ele.watched}
                          courseId={courseId}
                          week_id={week_id}
                          day_id={day_id}
                          subCourseId={subCourseId}
                          Lang={Lang}
                          videoURL={ele.videoURL}
                          videos={videos}
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

export default FristVideos;

export async function getServerSideProps({ req, params }) {
  //console.log("params", params);
  const { Lang, type, week, day, courseId, subCourseId } = params;

  try {
    const result = await axios
      .get(`${process.env.customKey}/videos/${courseId}/${subCourseId}/${day}/${week}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Access-Token": req.cookies.UT,
        },
      })
      .then((res) => res.data);
    console.log("videos_in_days", result);
    return {
      props: {
        videos: result,
        week_id: params.week,
        day_id: params.day,
        type: params.type,
        subCourseId: params.subCourseId,
        courseId: params.courseId,
        Lang: params.Lang.toLowerCase(),
        error: false,
        error_status: null,
      },
    };
  } catch (err) {
    console.log("errrr", err.response.data);

    return {
      props: {
        videos: null,
        week_id: params.week,
        day_id: params.day,
        type: params.type,
        subCourseId: params.subCourseId,
        courseId: params.courseId,
        Lang: params.Lang.toLowerCase(),
        error: true,
        error_Text: err.response.data.message,
      },
    };
  }
}
