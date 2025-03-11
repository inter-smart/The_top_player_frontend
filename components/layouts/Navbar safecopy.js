import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";
import styles from "@/styles/Navbar.module.css";
import { useRouter } from "next/router";
import { AiFillInstagram } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Sidebar } from "primereact/sidebar";
import { FaTiktok } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Image from "next/legacy/image";
import Cookies from "js-cookie";
import { ClearToken } from "@/store/CourcesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ClearSecret } from "@/store/AuthSlice";
import { useTranslation } from "react-i18next";
import LangWrap from "./LangWarp";

const Navbar = ({ overHeight, state }) => {
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { subscribedCourseArr } = useSelector((state) => state.CourcesSlice);
  useEffect(() => {
    if (router?.query?.Lang?.toLowerCase() === "ar") {
      i18n.changeLanguage("ar");
    } else {
      i18n.changeLanguage("en");
    }
  }, [i18n, router.query.Lang]);
  return (
    <LangWrap Lang={router?.query?.Lang?.toLowerCase() ? router?.query?.Lang?.toLowerCase() : "en"}>
      <div className={styles.navbar}>
        {toggle && <div className={styles.Dialog_drop} onClick={() => setToggle(false)}></div>}
        <Sidebar
          position={router?.query?.Lang?.toLowerCase() === "ar" ? "right" : "left"}
          visible={visible}
          onHide={() => setVisible(false)}
          showCloseIcon={false}
          style={{
            width: "90vw",
          }}
          // header={false}
        >
          <div
            className={styles.side_menu}
            style={{
              direction: router?.query?.Lang?.toLowerCase() === "ar" ? "rtl" : "ltr",
            }}
          >
            <div className={styles.Links_side}>
              <button className={styles.close_side} onClick={() => setVisible(false)}>
                <IoClose />
              </button>
              <Link
                onClick={() => setVisible(false)}
                href={`/${router?.query?.Lang?.toLowerCase()}`}
                className={router.asPath === router.query.Lang ? styles.active : styles.link}
              >
                {t("menu.home")}
              </Link>
              <Link
                onClick={() => setVisible(false)}
                href={`/${router?.query?.Lang?.toLowerCase()}#about`}
                className={router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#about`) ? styles.active : styles.link}
              >
                {t("menu.about")}
              </Link>
              <Link
                onClick={() => setVisible(false)}
                href={`/${router?.query?.Lang?.toLowerCase()}#programs`}
                className={
                  router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#programs`) ? styles.active : styles.link
                }
              >
                {t("menu.our_programs")}
              </Link>

              <Link
                onClick={() => setVisible(false)}
                href={`/${router?.query?.Lang?.toLowerCase()}#faq`}
                className={router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#faq`) ? styles.active : styles.link}
              >
                {t("menu.faq")}
              </Link>
              <Link
                onClick={() => setVisible(false)}
                href={`/${router?.query?.Lang?.toLowerCase()}#contact`}
                className={router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#contact`) ? styles.active : styles.link}
              >
                {t("menu.contact")}
              </Link>
              <hr />
              {Cookies.get("UT") && subscribedCourseArr && subscribedCourseArr.length > 0 && (
                <Link
                  href={`/${router?.query?.Lang?.toLowerCase()}/user/payment-program`}
                  onClick={() => setVisible(false)}
                  className={
                    router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}/user/payment-program`)
                      ? styles.active
                      : styles.link
                  }
                >
                  {t("menu.payments")}
                </Link>
              )}
              {Cookies.get("UT") && (
                <Link
                  href={`/${router?.query?.Lang?.toLowerCase()}/user/profile`}
                  onClick={() => setVisible(false)}
                  className={
                    router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}/user/profile`) ? styles.active : styles.link
                  }
                >
                  {t("menu.edit_profile")}
                </Link>
              )}
              {Cookies.get("UT") && (
                <Link
                  href={`/${router?.query?.Lang?.toLowerCase()}/user/update-password`}
                  onClick={() => setVisible(false)}
                  className={
                    router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}/user/update-password`)
                      ? styles.active
                      : styles.link
                  }
                >
                  {t("menu.update_pass")}
                </Link>
              )}
              {Cookies.get("UT") && (
                <Link
                  onClick={() => setVisible(false)}
                  href={`/${router?.query?.Lang?.toLowerCase()}/user/programs`}
                  className={
                    router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}/user/programs`) ? styles.active : styles.link
                  }
                >
                  {t("menu.my_programs")}
                </Link>
              )}
              {Cookies.get("UT") && <hr />}
              {!Cookies.get("UT") && (
                <Link
                  href={`/${router?.query?.Lang?.toLowerCase()}/auth/login`}
                  className={styles.sign_side}
                  onClick={() => setVisible(false)}
                >
                  <IoPersonCircleOutline
                    style={{
                      marginRight: router?.query?.Lang?.toLowerCase() === "ar" ? "0" : "10px",
                      marginLeft: router?.query?.Lang?.toLowerCase() === "ar" ? "10px" : "0",
                    }}
                  />
                  {t("menu.login")}
                </Link>
              )}

              {!Cookies.get("UT") && (
                <Link
                  href={`/${router?.query?.Lang?.toLowerCase()}/auth/signup`}
                  className={styles.sign_side}
                  onClick={() => setVisible(false)}
                >
                  <IoPersonCircleOutline
                    style={{
                      marginRight: router?.query?.Lang?.toLowerCase() === "ar" ? "0" : "10px",
                      marginLeft: router?.query?.Lang?.toLowerCase() === "ar" ? "10px" : "0",
                    }}
                  />
                  {t("menu.signup")}
                </Link>
              )}
              {/* {!Cookies.get("UT") && <hr />} */}

              {/* <button
              style={{
                textAlign:
                  router?.query?.Lang?.toLowerCase() === "ar" ? "right" : "left",
              }}
              className={styles.changeLang}
              onClick={() => {
                if (router?.query?.Lang?.toLowerCase() === "ar") {
                  i18n.changeLanguage("en");
                  router.push(`/en`);
                } else {
                  i18n.changeLanguage("ar");
                  router.push(`/ar`);
                }
                setVisible(false);
              }}
            >
              <MdGTranslate
                style={{
                  marginRight:
                    router?.query?.Lang?.toLowerCase() === "ar" ? "0" : "10px",
                  marginLeft:
                    router?.query?.Lang?.toLowerCase() === "ar" ? "10px" : "0",
                }}
              />{" "}
              {t("menu.chanage")}
            </button> */}
            </div>
            {Cookies.get("UT") && (
              <Link
                href={`/${router?.query?.Lang?.toLowerCase()}`}
                className={styles.out_side}
                onClick={() => {
                  setVisible(false);
                  Cookies.remove("UT");
                  dispatch(ClearToken());
                  dispatch(ClearSecret());
                }}
              >
                <CiLogout
                  style={{
                    marginRight: router?.query?.Lang?.toLowerCase() === "ar" ? "0" : "10px",
                    marginLeft: router?.query?.Lang?.toLowerCase() === "ar" ? "10px" : "0",
                  }}
                />
                {t("menu.logout")}
              </Link>
            )}
          </div>
        </Sidebar>
        <div
          className="container-xxl"
          style={{
            direction: router?.query?.Lang?.toLowerCase() === "ar" ? "rtl" : "ltr",
          }}
        >
          <div className={`row ${styles.center}`}>
            <Col xs={4} md={4} lg={4} className="d-block d-xl-none">
              <div className="d-flex align-items-center justify-content-start">
                <button
                  style={{
                    padding: 0,
                    display: "flex",
                  }}
                  className={styles.menu_button}
                  aria-label="menu"
                  name="menu"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  <RxHamburgerMenu />
                </button>

                <button
                  className={`${styles.menu_button} ${styles.image_lang} ${
                    router?.query?.Lang?.toLowerCase() === "ar" ? styles.ar_lang : styles.en_Lang
                  }`}
                  aria-label="menu"
                  name="menu"
                  onClick={() => {
                    setVisible(false);

                    if (router?.query?.Lang?.toLowerCase() === "ar") {
                      i18n.changeLanguage("en");
                      router.push(`/en`);
                    } else {
                      i18n.changeLanguage("ar");
                      router.push(`/ar`);
                    }
                  }}
                >
                  {t("menu.lang")}
                </button>
              </div>
            </Col>

            <Col xs={4} md={2} lg={2}>
              <div
                className={`${styles.image_container}`}
                onClick={() => {
                  router.push(`/${router?.query?.Lang?.toLowerCase()}`);
                  overHeight(false);
                  setShow(false);
                  setToggle(false);
                }}
              >
                <Image
                  src={"/images/logo.svg"}
                  layout={"fill"}
                  objectFit={"contain"}
                  alt={"logo"}
                  priority
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                />
              </div>
            </Col>
            <Col xs={4} md={4} lg={4} className="d-block d-xl-none">
              <p className={`${styles.tag} ${router?.query?.Lang?.toLowerCase() === "ar" ? styles.tag_ar : styles.tag_en}`}>
                #تمرينك_توب
              </p>
            </Col>

            {/* <Col xs={3} md={2} lg={2} className="d-block d-md-none"></Col> */}

            <Col lg={6} className={`${styles.menu} `}>
              <div className={`${styles.NavLinks} ${show && styles.menuActive}`}>
                <div className={`text-center ${styles.NavLinksOne}`}>
                  <Link
                    onClick={() => {
                      setShow(false);
                      overHeight(false);
                      setToggle(false);
                    }}
                    title={"web Home"}
                    href={`/${router?.query?.Lang?.toLowerCase()}`}
                    className={router.asPath === router.query.Lang ? styles.active : styles.link}
                  >
                    {t("menu.home")}
                  </Link>

                  <Link
                    onClick={() => {
                      setShow(false);
                      overHeight(false);
                      setToggle(false);
                    }}
                    title={"about us"}
                    href={`/${router?.query?.Lang?.toLowerCase()}#about`}
                    className={
                      router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#about`) ? styles.active : styles.link
                    }
                  >
                    {t("menu.about")}
                  </Link>
                  <Link
                    onClick={() => {
                      setShow(false);
                      overHeight(false);
                      setToggle(false);
                    }}
                    title={"Our Programs"}
                    href={`/${router?.query?.Lang?.toLowerCase()}#programs`}
                    className={
                      router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#programs`) ? styles.active : styles.link
                    }
                  >
                    {t("menu.our_programs")}
                  </Link>
                  <Link
                    onClick={() => {
                      setShow(false);
                      overHeight(false);
                      setToggle(false);
                    }}
                    title={"Trending News"}
                    href={`/${router?.query?.Lang?.toLowerCase()}#news`}
                    className={
                      router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#news`) ? styles.active : styles.link
                    }
                  >
                    {t("menu.our_news")}
                  </Link>
                  <Link
                    onClick={() => {
                      setShow(false);
                      overHeight(false);
                      setToggle(false);
                    }}
                    title={"contact"}
                    href={`/${router?.query?.Lang?.toLowerCase()}#contact`}
                    className={
                      router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#contact`) ? styles.active : styles.link
                    }
                  >
                    {t("menu.contact")}
                  </Link>
                  <Link
                    onClick={() => {
                      setShow(false);
                      overHeight(false);
                      setToggle(false);
                    }}
                    title={"faq"}
                    href={`/${router?.query?.Lang?.toLowerCase()}#faq`}
                    className={router.asPath.includes(`/${router?.query?.Lang?.toLowerCase()}#faq`) ? styles.active : styles.link}
                  >
                    {t("menu.faq")}
                  </Link>
                </div>
                <div className={`text-center ${styles.followus}`}>
                  <p>{t("menu.follow")}</p>
                  <div className={styles.iconsSec}>
                    <a
                      style={{ textDecoration: "none" }}
                      aria-label="our ios application"
                      href={"https://www.tiktok.com/@thetop.player?_t=8i0wA2PQnHc&_r=1"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.span_div}
                    >
                      <FaTiktok />
                    </a>

                    <a
                      style={{ textDecoration: "none" }}
                      aria-label="our ios application"
                      href={"https://www.instagram.com/thetop.player/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.span_div}
                    >
                      <AiFillInstagram />
                    </a>

                    <a
                      style={{ textDecoration: "none" }}
                      aria-label="our ios application"
                      href={
                        "https://api.whatsapp.com/send/?phone=971501225632&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%2C+%D8%B9%D9%86%D8%AF%D9%8A+%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1+%D8%A8%D8%AE%D8%B5%D9%88%D8%B5&type=phone_number&app_absent=0"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.span_div}
                    >
                      <BsWhatsapp />
                    </a>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={!Cookies.get("UT") ? 3 : 2} className="d-none d-xl-block">
              <div className={styles.Login}>
                {!Cookies.get("UT") && (
                  <Link
                    href={`/${router?.query?.Lang?.toLowerCase()}/auth/signup`}
                    onClick={() => {
                      setToggle(false);
                    }}
                    className={`${styles.log} ${styles.hoveranim}`}
                  >
                    <span>{t("menu.signup")}</span>
                  </Link>
                )}

                <button className={styles.toogle_menu} onClick={() => setToggle(!toggle)}>
                  <IoPersonCircleOutline />
                  <Image src={"/images/icon-user.svg"} layout={"fill"} objectFit={"contain"} alt={"user"} />
                </button>
                {/* <button
                className={`${styles.toogle_menu} ${styles.image_lang}`}
                onClick={() => {
                  if (router?.query?.Lang?.toLowerCase() === "ar") {
                    i18n.changeLanguage("en");
                    router.push(`/en`);
                  } else {
                    i18n.changeLanguage("ar");
                    router.push(`/ar`);
                  }
                }}
              >
                <Image
                  src={
                    router?.query?.Lang?.toLowerCase() === "ar"
                      ? "/images/en.png"
                      : "/images/ar.png"
                  }
                  layout="fill"
                  objectFit="contain"
                  alt="Langauge"
                />
              </button> */}
                <button
                  className={`${styles.menu_button} ${styles.image_lang} ${
                    router?.query?.Lang?.toLowerCase() === "ar" ? styles.ar_lang : styles.en_Lang
                  }`}
                  aria-label="menu"
                  name="menu"
                  onClick={() => {
                    setVisible(false);

                    if (router?.query?.Lang?.toLowerCase() === "ar") {
                      i18n.changeLanguage("en");
                      router.push(`/en`);
                    } else {
                      i18n.changeLanguage("ar");
                      router.push(`/ar`);
                    }
                  }}
                >
                  {t("menu.lang")}
                </button>
                {toggle && (
                  <div
                    className={styles.drop_men}
                    style={{
                      right: router?.query?.Lang?.toLowerCase() === "ar" ? "unset" : "50px",
                      left: router?.query?.Lang?.toLowerCase() === "ar" ? "0" : "unset",
                    }}
                  >
                    {!Cookies.get("UT") && (
                      <Link href={`/${router?.query?.Lang?.toLowerCase()}/auth/login`} onClick={() => setToggle(false)}>
                        {t("menu.login")}
                      </Link>
                    )}
                    {!Cookies.get("UT") && <hr />}
                    {!Cookies.get("UT") && (
                      <Link href={`/${router?.query?.Lang?.toLowerCase()}/auth/signup`} onClick={() => setToggle(false)}>
                        {t("menu.signup")}
                      </Link>
                    )}

                    {Cookies.get("UT") && (
                      <Link href={`/${router?.query?.Lang?.toLowerCase()}/user/programs`} onClick={() => setToggle(false)}>
                        {t("menu.my_programs")}
                      </Link>
                    )}
                    {Cookies.get("UT") && subscribedCourseArr && subscribedCourseArr.length > 0 && <hr />}
                    {Cookies.get("UT") && subscribedCourseArr && subscribedCourseArr.length > 0 && (
                      <Link href={`/${router?.query?.Lang?.toLowerCase()}/user/payment-program`} onClick={() => setToggle(false)}>
                        {t("menu.payments")}
                      </Link>
                    )}
                    {Cookies.get("UT") && <hr />}
                    {Cookies.get("UT") && (
                      <Link href={`/${router?.query?.Lang?.toLowerCase()}/user/profile`} onClick={() => setToggle(false)}>
                        {t("menu.edit_profile")}
                      </Link>
                    )}
                    {Cookies.get("UT") && <hr />}
                    {Cookies.get("UT") && (
                      <Link href={`/${router?.query?.Lang?.toLowerCase()}/user/update-password`} onClick={() => setToggle(false)}>
                        {t("menu.update_pass")}
                      </Link>
                    )}
                    {Cookies.get("UT") && <hr />}
                    {Cookies.get("UT") && (
                      <Link
                        href={`/${router?.query?.Lang?.toLowerCase()}`}
                        onClick={() => {
                          setToggle(false);
                          Cookies.remove("UT");
                          dispatch(ClearToken());
                          dispatch(ClearSecret());
                          // window.location.reload();
                        }}
                      >
                        {t("menu.logout")}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </div>
        </div>
      </div>
    </LangWrap>
  );
};

export default Navbar;
