import Image from "next/legacy/image";
import styles from "@/styles/Home.module.css";
// import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsubscribedCourse } from "@/store/CourcesSlice";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import LangWrap from "@/components/layouts/LangWarp";
const Programs = ({ Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getsubscribedCourse())
      .unwrap()
      .then(() => {})
      .catch((err) => {
        if (err?.response?.status === 401) {
          Cookies.remove("UT");
          router.push(`/${Lang}`);
        }
      });
  }, [dispatch, Lang, router]);
  const { subscribedCourseArr } = useSelector((state) => state.CourcesSlice);
  const Fitness = subscribedCourseArr?.find((ele) => ele.courseId === 1);
  const Fitness_Fottboll = subscribedCourseArr?.find((ele) => ele.courseId === 2);
  const Football = subscribedCourseArr?.find((ele) => ele.courseId === 3);

  console.log("MY PROGRAM", subscribedCourseArr);

  return (
    <LangWrap Lang={Lang}>
      <div className={"inner_section_outer"}>
        <div
          className="container"
          style={{
            direction: Lang === "ar" ? "rtl" : "ltr",
          }}
        >
          <div className={`${styles.Program_Section} padding_all ${styles.our_programs}`}>
            <div className={"tleWrap"}>
              <h1 className="mTle">{t("programs.my_programs")}</h1>
              <div className={styles.top1_titlle}>{/* <h3 className={styles.small_title}>{t("programs.top")}</h3> */}</div>
            </div>

            <div className="row justify-content-center">
              {Fitness && (
                <div className="col-md-6 col-lg-4 ">
                  <Link href={`/${Lang}/user/programs/details/1`} className={styles.card} style={{ textDecoration: "none" }}>
                    {/* <div className={styles.filnal_price}>
                  <p>
                    25%
                    <span>{t("programs.off")}</span>
                  </p>
                </div> */}
                    <div className={styles.card_image}>
                      <Image src={"/images/1.png"} alt="fitness" layout="fill" objectFit="contain" loading="lazy" />
                    </div>
                    <div className={styles.info_card}>
                      <h4>{t("programs.fitness.title")}</h4>
                      <ul className={`${Lang === "ar" ? styles.rightText : styles.leftText}`}>
                        <li>
                          <p>
                            {t("programs.fitness.line1_1")} <span className="En_num">{t("programs.fitness.line1_2")}</span>
                            {t("programs.fitness.line1_3")}
                          </p>
                        </li>
                        <li>
                          <p>
                            <span className="En_num">{t("programs.fitness.line2_1")}</span>
                            {t("programs.fitness.line2_2")}
                            <span className="En_num">{t("programs.fitness.line2_3")}</span>
                            {t("programs.fitness.line2_4")}
                          </p>
                        </li>
                        <li>
                          <p>
                            {t("programs.fitness.line3_1")}
                            <span className="En_num">{t("programs.fitness.line3_2")}</span>
                            {t("programs.fitness.line3_3")}
                          </p>
                        </li>
                        <li>
                          <p>{t("programs.fitness.line4")}</p>
                        </li>
                        <li>
                          <p>
                            {t("programs.fitness.line5_1")}
                            <span className="En_num">{t("programs.fitness.line5_2")}</span>
                            {t("programs.fitness.line5_3")}
                          </p>
                        </li>
                      </ul>
                      {/* <div
                    className={`${styles.price_offer} ${
                      Lang === "ar" ? styles.rightPrice : styles.leftPrice
                    }`}
                  >
                    <h5>80</h5>
                    <h6>
                      <del>105 </del>
                    </h6>
                  </div> */}
                      <button>{t("programs.yalla")}</button>
                    </div>
                  </Link>
                </div>
              )}
              {Fitness_Fottboll && (
                <div className="col-md-6 col-lg-4">
                  <Link
                    href={`/${Lang}/user/programs/details/${process.env.FREE_COURSE_ID}/sub/${process.env.FREE_COURSE_SUB_ID}`}
                    className={styles.card}
                    style={{ textDecoration: "none" }}
                  >
                    {/* <div className={styles.filnal_price}>
                  <p>
                    40%
                    <span>{t("programs.off")}</span>
                  </p>
                </div> */}
                    <div className={styles.card_image}>
                      <Image src={"/images/2.png"} alt="fitness + football" layout="fill" objectFit="contain" loading="lazy" />
                    </div>
                    <div className={styles.info_card}>
                      <h4>
                        {t("programs.fitness_name")} <span>+</span> {t("programs.football.title")}
                      </h4>
                      <ul className={`${Lang === "ar" ? styles.rightText : styles.leftText}`}>
                        <li>
                          <div className="fitness_fottboll_line">
                            {t("programs.fitness_fottboll.line1_1")}
                            <span className="En_num">{t("programs.fitness_fottboll.line1_2")}</span>
                            {t("programs.fitness_fottboll.line1_3")}

                            <p></p>
                            <span className="En_num">{t("programs.fitness_fottboll.line1_1_1")}</span>
                            {t("programs.fitness_fottboll.line1_1_2")}

                            <p></p>
                            <span className="En_num">{t("programs.fitness_fottboll.line1_1_3")}</span>
                            {t("programs.fitness_fottboll.line1_1_4")}
                          </div>
                        </li>
                        <li>
                          <p>{t("programs.fitness_fottboll.line2")}</p>
                        </li>
                        <li>
                          <p>{t("programs.fitness_fottboll.line3")}</p>
                        </li>
                        <li>
                          <p>
                            {t("programs.fitness_fottboll.line4_1")}
                            <span className="En_num">{t("programs.fitness_fottboll.line4_2")}</span>
                          </p>
                        </li>
                      </ul>
                      {/* <ul>
                    <li>
                    {t("programs.fitness_fottboll.line1")}
                        <br />
                        <span>&nbsp;</span>
                        {t("programs.fitness_fottboll.line1_2")} <br />
                        {t("programs.fitness_fottboll.line1_3")}
                    </li>
                    <li>
                      <p>
                        <span>•</span>
                        {t("programs.fitness_fottboll.line2")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>•</span> {t("programs.fitness_fottboll.line3")}
                      </p>
                    </li>

                    <li>
                      <p>
                        <span>•</span> {t("programs.fitness_fottboll.line4")}
                      </p>
                    </li>
                  </ul> */}
                      {/* <div
                    className={`${styles.price_offer} ${
                      Lang === "ar" ? styles.rightPrice : styles.leftPrice
                    }`}
                  >
                    <h5>130</h5>
                    <h6>
                      <del>210 </del>
                    </h6>
                  </div> */}
                      <button>{t("programs.yalla")}</button>
                    </div>
                  </Link>
                </div>
              )}
              {Football && (
                <div className="col-md-6 col-lg-4">
                  <Link href={`/${Lang}/user/programs/details/3`} className={styles.card} style={{ textDecoration: "none" }}>
                    {/* <div className={styles.filnal_price}>
                  <p>
                    25%
                    <span>{t("programs.off")}</span>
                  </p>
                </div> */}
                    <div className={styles.card_image}>
                      <Image src={"/images/3.png"} alt="fitness" layout="fill" objectFit="contain" loading="lazy" />
                    </div>
                    <div className={styles.info_card}>
                      <h4>{t("programs.football.title")}</h4>
                      {/* <ul>
                    <li>
                      <p>
                        <span>•</span> {t("programs.football.line1")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>•</span> {t("programs.football.line2")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>•</span>
                        {t("programs.football.line3")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>•</span> {t("programs.football.line4")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>•</span> {t("programs.football.line5")}
                      </p>
                    </li>
                  </ul> */}
                      <ul className={`${Lang === "ar" ? styles.rightText : styles.leftText}`}>
                        <li>
                          <p>
                            {t("programs.football.line1_1")}
                            <span className="En_num">{t("programs.football.line1_2")}</span>
                            {t("programs.football.line1_3")}
                          </p>
                        </li>
                        <li>
                          <p>
                            <span className="En_num">{t("programs.football.line2_1")}</span>
                            {t("programs.football.line2_2")}
                            <span className="En_num">{t("programs.football.line2_3")}</span>
                            {t("programs.football.line2_4")}
                          </p>
                        </li>
                        <li>
                          <p>
                            {t("programs.football.line3_1")}
                            <span className="En_num">{t("programs.football.line3_2")}</span>
                            {t("programs.football.line3_3")}
                          </p>
                        </li>

                        <li>
                          <p>{t("programs.football.line4")}</p>
                        </li>
                        <li>
                          <p>
                            {t("programs.football.line5_1")}

                            <span className="En_num">{t("programs.football.line5_2")}</span>
                            {t("programs.football.line5_3")}
                          </p>
                        </li>
                      </ul>
                      {/* <div
                    className={`${styles.price_offer} ${
                      Lang === "ar" ? styles.rightPrice : styles.leftPrice
                    }`}
                  >
                    <h5>80</h5>
                    <h6>
                      <del>105 </del>
                    </h6>
                  </div> */}
                      <button>{t("programs.yalla")}</button>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LangWrap>
  );
};

export default Programs;
export async function getServerSideProps({ params }) {
  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
