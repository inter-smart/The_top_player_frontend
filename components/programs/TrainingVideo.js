import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Program.module.scss";

const TrainingVideo = ({ Lang, CourseByIdArray }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.trainingVideo_section}>
      <div className={"container"}>
        <div className={styles.imgWrap}>
          <video muted autoPlay loop playsInline preload="metadata" aria-label="video player">
            <source src={`${process.env.customKey}/courseImages/${CourseByIdArray?.videoUrl}`} type="video/mp4" />
            {/* <source src="/videos/programVideo.mp4" type="video/mp4" /> */}
          </video>
        </div>
      </div>
    </div>
  );
};

export default TrainingVideo;
