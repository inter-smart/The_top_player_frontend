import Image from "next/legacy/image";
import { useRouter } from "next/router";
// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
export default function Custom404() {
  const { t } = useTranslation();
  // const { navHeight } = useSelector((state) => state.HomeSlice);
  const router = useRouter();

  return (
    <div
      className="NotFound container-fluid"
      // style={{
      //   marginTop: `${navHeight + 5}px`,
      // }}
    >
      <div className={"inner_section_outer"}>
        <div className="container">
          <div className="Image_notFound">
            <Image
              src={"/images/logo.png"}
              layout="fill"
              objectFit="contain"
              objectPosition={"center"}
              alt="Not found"
              loading="lazy"
            />
          </div>
          <h1> Page Not Found </h1>
        </div>
      </div>
    </div>
  );
}
