import styles from "@/styles/Footer.module.css";
import Image from "next/legacy/image";
// import { GoLocation } from "react-icons/go";
// import { BsWhatsapp } from "react-icons/bs";
// import { HiOutlineMail } from "react-icons/hi";
// import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok, FaStripe, FaGooglePay, FaApplePay } from "react-icons/fa";
import { SiVisa } from "react-icons/si";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { subscribeReducer } from "@/store/AuthSlice";
import { Toast } from "primereact/toast";
import LangWrap from "./LangWarp";
import { getFooter } from "@/store/FooterSlice";
import Cookies from "js-cookie";
const Footer = ({ Lang }) => {
  const { t } = useTranslation();
  const getUser = Cookies.get("UT");

  useEffect(() => {
    dispatch(getFooter());
  }, []);

  const { footer } = useSelector((state) => state.FooterSlice);
  // const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.email) {
        errors.email = " Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = "Invalid email";
      }
      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        dispatch(subscribeReducer(data))
          .unwrap()
          .then((res) => {
            show();
            formik.resetForm();
          })
          .catch((err) => {
            if (err?.response?.data?.message) {
              EMptyInput(err.response.data.message);
            } else {
              EMptyInput(t("auth.wrong"));
            }
            // EMptyInput()
          });
      }
    },
  });
  const toast = useRef(null);
  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: `${mess}`,
      // life: 3000,
    });
  };
  const show = () => {
    toast.current.show({
      severity: "success",
      summary: t("auth.succ_signup"),
      // detail: formik.values.value,
    });
  };

  const handleFreeTrial = (e) => {
    const { Lang } = router.query;
    e.preventDefault();

    if (getUser) {
      router.push(`/${Lang}/user/programs/details/${process.env.FREE_COURSE_ID}/sub/${process.env.FREE_SUB_ID}`);
    } else {
      sessionStorage.setItem("courseId", process.env.FREE_COURSE_ID);
      sessionStorage.setItem("subId", process.env.FREE_SUB_ID);
      sessionStorage.setItem("isFree", "true");
      router.push(`/${Lang}/auth/login`);
    }
  };

  return (
    <LangWrap Lang={router?.query?.Lang?.toLowerCase() ? router?.query?.Lang?.toLowerCase() : "en"}>
      <Toast ref={toast} />
      <div className={styles.footer}>
        <div
          className="container"
          style={{
            direction: router?.query?.Lang?.toLowerCase() === "ar" ? "rtl" : "ltr",
          }}
        >
          <div className="row justify-content-between ">
            <div className={`col-md-4 ${styles.column}`}>
              {/* <h2>{t("title")}</h2> */}
              <div className={styles.logoWrap}>
                <Image src={"/images/logo-light.svg"} alt="bg" width={218} height={60} layout="responsive" objectFit="contain" loading="lazy" />
              </div>
              {footer?.map((item) => (
                <p key={item.id}>{router?.query?.Lang?.toLowerCase() === "ar" ? item?.footer_ar : item?.footer_en}</p>
              ))}
              {/* <p>{t("footer.about")}</p> */}
            </div>
            <div className={`col-6 col-md-2 ${styles.column}`}>
              <h3 className={router?.query?.Lang?.toLowerCase() === "ar" ? "mob_right" : "mob_left"}>{t("footer.feature")}</h3>
              <div className={styles.Links}>
                <Link href={`/${router?.query?.Lang?.toLowerCase()}`} className="customLink">
                  {t("menu.home")}
                </Link>
                <Link href={`/${router?.query?.Lang?.toLowerCase()}#about`} className="customLink">
                  {t("menu.about")}
                </Link>
                <Link href={`/${router?.query?.Lang?.toLowerCase()}#news`} className="customLink">
                  {t("menu.our_news")}
                </Link>
                <Link href={`/${router?.query?.Lang?.toLowerCase()}#programs`} className="customLink">
                  {t("menu.our_programs")}
                </Link>
                <Link href={`/${router?.query?.Lang?.toLowerCase()}#faq`} className="customLink">
                  {t("menu.faq")}
                </Link>
                <Link href={`/${router?.query?.Lang?.toLowerCase()}/auth/login`} className="customLink">
                  {t("auth.login")}
                </Link>
                <Link href="#" onClick={(e) => handleFreeTrial(e)} className="customLink">
                  {t("programs.free_trial")}
                </Link>
              </div>
            </div>
            <div className={`col-6 col-md-2 ${styles.column}`}>
              <h3
                style={{
                  textAlign: router?.query?.Lang?.toLowerCase() === "ar" ? "right" : "left",
                }}
              >
                {t("footer.contact")}
              </h3>
              <div className={styles.Links}>
                <a
                  aria-label="our whatsapp "
                  href={
                    "https://api.whatsapp.com/send/?phone=971501225632&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%2C+%D8%B9%D9%86%D8%AF%D9%8A+%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1+%D8%A8%D8%AE%D8%B5%D9%88%D8%B5&type=phone_number&app_absent=0"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.span_div} customLink`}
                >
                  {t("footer.whatsapp")}
                  {/* <BsWhatsapp /> */}
                </a>
                <a
                  aria-label="our instagram"
                  href={"https://www.instagram.com/thetop.player/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.span_div} customLink`}
                >
                  {t("footer.instagram")}

                  {/* <A style={{textDecoration:"none"}}}}iFillInstagram /> */}
                </a>
                <a
                  aria-label="Tiktok"
                  href={"https://www.tiktok.com/@thetop.player?_t=8i0wA2PQnHc&_r=1"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.span_div} customLink`}
                >
                  {t("footer.tiktok")}
                </a>
                <a
                  aria-label="Snapchat"
                  href="https://www.snapchat.com/add/thetop.player"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.span_div} customLink`}
                >
                  {t("footer.snapchat")}
                </a>
              </div>
            </div>
            <div className={`col-md-4 ${styles.column}`}>
              <h3>{t("footer.email")}</h3>
              <form onSubmit={formik.handleSubmit} className={styles.form}>
                <input
                  style={{
                    marginRight: router?.query?.Lang?.toLowerCase() === "ar" ? "0" : "10px",
                    marginLeft: router?.query?.Lang?.toLowerCase() === "ar" ? "10px" : "0",
                  }}
                  placeholder={t("footer.enter_email")}
                  // value={email}
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  // onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit" name="subscribe">
                  {t("footer.subscribe")}
                </button>
              </form>
              <h3>{t("footer.payment")}</h3>
              <div className={styles.Payments}>
                <span style={{ objectFit: "contain", padding: "3px" }}>
                  <img width={"100%"} src={"/images/tamara_logo.png"} alt="Tamra Icon" />
                </span>
                <span>
                  <FaStripe />
                </span>
                <span>
                  <SiVisa />
                </span>

                <span>
                  <FaGooglePay />
                </span>
                <span>
                  <FaApplePay />
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className={styles.rights}>
            <p className="text-center">
              {t("footer.copy_1")}
              {/* <span className="En_num">{t("footer.copy_2")}</span> */}
              <span className="En_num">{new Date().getFullYear()}</span>
              {t("footer.copy_3")}
            </p>
          </div>
        </div>
      </div>
    </LangWrap>
  );
};

export default Footer;
