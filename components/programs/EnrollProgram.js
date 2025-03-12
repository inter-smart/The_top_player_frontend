import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Program.module.scss";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const EnrollProgram = ({ Lang, programId, CoursecArr, CourseByIdArray, expired }) => {
  const { t } = useTranslation();

  console.log("ITEMSINCOURSE",CoursecArr)
  console.log("ITEMSINCOURSE",CourseByIdArray)

  const router = useRouter();
  const currentPath = router.pathname;
  const wordToCheck = "camps";
  const regex = new RegExp(`\\b${wordToCheck}\\b`);

  const handleRedirect = () => {
    if (regex.test(currentPath)) {
      if (Cookies.get("UT")) {
        router.push(`/${Lang}/user/payment/tamara/${programId}`);
      } else {
        sessionStorage.setItem("tamaraId", programId);
        router.push(`/${Lang}/auth/login`);
      }
    } else {
      if (Cookies.get("UT")) {
        router.push(`/${Lang}/user/payment/${programId}`);
      } else {
        sessionStorage.setItem("courseId", programId);
        router.push(`/${Lang}/auth/login`);
      }
    }
  };

  return (
    <div className={styles.enrollProgram_section}>
      <div className={"container"}>
        <div className={styles.enrollProgramBx}>
          <div className={styles.lftWrap}>
            <div className={`${styles.tleWrap} tleWrap`}>
              <div className={styles.dElmt}></div>
              <div className={`${styles.mTle} mTle `}>
                {regex.test(currentPath)
                  ? t((CoursecArr?.isPurchased) ? "joined_the_camp" : "join_to_our_camp")
                  : t(expired ? "renew_program" : "enroll_to_our_program")}
              </div>
              <div className={styles.txt}>{Lang === "ar" ? CourseByIdArray?.enroll_text_ar : CourseByIdArray?.enroll_text}</div>
            </div>
          </div>
          <div className={styles.rgtWrap}>
            <div className={styles.btnWrap}>
              {!CoursecArr ? (
                <button
                  onClick={handleRedirect}
                  className={CourseByIdArray?.isFull ? "baseBtn" : "baseBtn hoveranim"}
                  aria-label="view all button"
                  disabled={CourseByIdArray?.isFull}
                >
                  <span>{CourseByIdArray?.isFull ? t("camp_full") : t("join_now")}</span>
                </button>
              ) : expired ? (
                <button onClick={handleRedirect} className={"baseBtn hoveranim"} aria-label="view all button">
                  <span>{t("renew")}</span>
                </button>
              ) : (
                <button onClick={handleRedirect} className={"baseBtn hoveranim"} aria-label="view all button">
                  <span>{expired ? t("renew") : t("join_now")}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollProgram;
