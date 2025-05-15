import Link from "next/link";
import styles from "@/styles/Profile.module.scss";
import { FaCheck } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
// import { useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getVideo } from "@/store/CourcesSlice";
// import Cookies from "js-cookie";
// import ReactPlayer from "react-player";
// import useIntersectionObserver from "@react-hook/intersection-observer";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

const VideoCard = ({
  id,
  active,
  type,
  name,
  Lang,
  week_id,
  day_id,
  courseId,
  subCourseId,
  videoURL,
  setVideoUrl,
  videoURl,
  setVideoKey,
  videos
}) => {
  // const videoEl = useRef(null);
  // const [mintes, setMintes] = useState(0);
  // const containerRef = useRef();
  // const lockRef = useRef(false);
  // const { isIntersecting } = useIntersectionObserver(containerRef);
  // if (isIntersecting) {
  //   lockRef.current = true;
  // }
  // const handleLoadedMetadata = () => {
  //   const video = videoEl.current;
  //   if (!video) return;
  //   if (video.duration > 60) {
  //     let minutes = Math.floor(video.duration / 60)
  //       .toString()
  //       .padStart(2, "0");
  //     let seconds = Math.round(video.duration % 60)
  //       .toString()
  //       .padStart(2, "0");
  //     setMintes(`${minutes}:${seconds}`);
  //   } else {
  //     setMintes(`0 :${parseInt(video.duration)}`);
  //   }
  // };
  const router = useRouter()
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        // //console.log(videoURl)
        const video = videos.filter((ele) => ele.id === id)[0];
        const video_key = videos.indexOf(video);
        setVideoKey(video_key);
        // //console.log(video_key)
        router.push(router.asPath)
        const data = {
          id,
          name,
          watched: active,
          videoURL: videoURL,
        };
        setVideoUrl(data);
      }}
      // ref={containerRef}
      // href={`/${Lang}/user/programs/${type}/${week_id}/${day_id}/${courseId}/${subCourseId}/${id}/${name}`}
      className={styles.video_card}
    >
      <span
        className={`${styles.check} ${
          active ? styles.active : styles.not_active
        }`}
      >
        <FaCheck />
      </span>
      <div className={styles.Video_image}>
        <span className={styles.start}>
          <FaCirclePlay />
        </span>
        {/* <Image src={"https://backend.thetopplayer.com/images/warm%20up%20both.jpg"} layout="fill" objectFit="cover" alt={name} /> */}
        <Image src={videoURL} layout="fill" alt={name} />
        {/* <Image src={`${process.env.customKey}/images/${videoURL}`} layout="fill" objectFit="cover" alt={name} /> */}

        {/* <div className={styles.ImageVideo}>
        </div> */}
        {/* {lockRef.current && (
          <video
            muted
            controlsList="nodownload"
            ref={videoEl}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source
              src={`${
                process.env.customKey
              }/video/${id}/${courseId}/${Cookies.get("UT")}`}
              type="video/mp4"
            />
            
          </video>
        )} */}
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        {/* <p>video {id}</p> */}
        {/* <p>{mintes} </p> */}
        {/* <p>{mintes} : {seconds} </p> */}
      </div>
    </div>
  );
};

export default VideoCard;
