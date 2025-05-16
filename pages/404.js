import Image from "next/legacy/image";
import { useRouter } from "next/router";
// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
import styles from "@/styles/Error.module.scss";
import Link from "next/link";
export default function Custom404() {
  const { t } = useTranslation();
  // const { navHeight } = useSelector((state) => state.HomeSlice);
  const router = useRouter();

  return (
    <>
      <div className={styles.inner_header_bg}></div>
      <section>
        <div className="container">
          <div className={styles.error_wrap}>
            <div className={styles.img_wrap}>
              <Image
                src={"/images/logo.png"}
                width={100}
                height={100}
                objectFit="contain"
                objectPosition={"center"}
                alt="Not found"
              />
            </div>
            <div className={`${styles.tle_wrap} tleWrap`}>
              <h1 className="mTle"> 404 </h1>
              <h3>Page not found</h3>
            </div>
            <Link href={"/"} className={`${styles.base_btn} baseBtn hoveranim`}>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
