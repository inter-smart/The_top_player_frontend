import React, { useEffect, useState } from "react";
import styles from "@/styles/Share.module.css";
import { AiOutlineArrowUp } from "react-icons/ai";
import Link from "next/link";
import { RiWhatsappLine } from "react-icons/ri";
import { useRouter } from "next/router";
const SocialMedia = ({ to }) => {
  const [height, setHeight] = useState(false);
  const handleScroll2 = () => {
    if (window.scrollY >= 200) {
      setHeight(true);
    } else {
      setHeight(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll2, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll2, { passive: false });
    };
  });
  const router = useRouter();
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (router.pathname.includes("/[Lang]/user/programs/[type]/[week]/[day]")) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router.pathname]);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.SocialIcons}>
      {show && (
        <ul>
          <li>
            <span>
              {/* <Link
                href={`${to}`}
                title="scroll to top"
                className={height ? styles.activeTop : ""}
              >
                <AiOutlineArrowUp />
              </Link> */}
              <div
                title="scroll to top"
                className={height ? `${styles["activeTop"]} ${styles["scrollBtn"]}` : styles.scrollBtn}
                onClick={goToTop}
              >
                <AiOutlineArrowUp />
              </div>
            </span>
          </li>
          <li>
            <span>
              <a
                style={{ textDecoration: "none" }}
                aria-label="our whatsapp number"
                href={`https://api.whatsapp.com/send/?phone=971501225632&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%2C+%D8%B9%D9%86%D8%AF%D9%8A+%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1+%D8%A8%D8%AE%D8%B5%D9%88%D8%B5&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiWhatsappLine />
              </a>
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SocialMedia;
