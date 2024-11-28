import Image from "next/legacy/image";
import styles from "@/styles/Home.module.css";
// import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPrograms, getsubscribedCourse } from "@/store/CourcesSlice";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import LangWrap from "@/components/layouts/LangWarp";
const Programs = ({ Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getMyPrograms())
      .unwrap()
      .then(() => {})
      .catch((err) => {
        if (err?.response?.status === 401) {
          Cookies.remove("UT");
          router.push(`/${Lang}`);
        }
      });
  }, [dispatch, Lang, router]);
  const { myPrograms, isCourcesLoading } = useSelector((state) => state.CourcesSlice);

  console.log("MY PROGRAM", myPrograms);

  const handleRedirection = (type, id) => {
    const programType = type ? type : "programs";
    const isFreeCourse = id == process.env.FREE_COURSE_ID;
    router.push(`/${Lang}/user/${programType}/details/${id}/${isFreeCourse ? `sub/${process.env.FREE_SUB_ID}` : ""}`);
  };

  if (isCourcesLoading) {
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
                <h1 className="mTle">Loading</h1>
                <div className={styles.top1_titlle}>{/* <h3 className={styles.small_title}>{t("programs.top")}</h3> */}</div>
              </div>
            </div>
          </div>
        </div>
      </LangWrap>
    );
  }

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
              <h1 className="mTle">{myPrograms?.length > 0 ? t("programs.my_programs") : t("programs.no_programs")}</h1>
              <div className={styles.top1_titlle}>{/* <h3 className={styles.small_title}>{t("programs.top")}</h3> */}</div>
            </div>

            <div className="row justify-content-center">
              {myPrograms?.length > 0 &&
                myPrograms?.map((item, index) => (
                  <div className="col-md-6 col-lg-4 mb-2">
                    <div
                      onClick={() => handleRedirection(item?.course?.course_type, item?.course?.id)}
                      className={styles.card}
                      style={{ textDecoration: "none" }}
                    >
                      <div className={styles.card_image}>
                        <Image
                          src={`${process.env.customKey}/courseImages/${item?.course?.imageUrl}`}
                          alt="fitness"
                          layout="fill"
                          objectFit="contain"
                          loading="lazy"
                        />
                      </div>
                      <div className={styles.info_card}>
                        <h4>{Lang == "en" ? item?.course?.name : item?.course?.name_arabic}</h4>
                        <ul
                          className={`${Lang === "ar" ? styles.rightText : styles.leftText}`}
                          dangerouslySetInnerHTML={{
                            __html: Lang === "ar" ? item?.course?.checklistHTMLAr : item?.course?.checklistHTML,
                          }}
                        ></ul>
                        <button>{item?.course?.isexpired ? t("renew") : t("programs.yalla")}</button>
                      </div>
                    </div>
                  </div>
                ))}
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
