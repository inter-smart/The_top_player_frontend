import LangWrap from "@/components/layouts/LangWarp";
import { checkToken } from "@/store/CourcesSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const Verifivation = ({ token_id, Lang }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(true);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  // useEffect(() => {
  //   if (token_id) {
  //     dispatch(checkToken(token_id))
  //       .unwrap()
  //       .then((res) => {
  //         setVerify(false);
  //         Cookies.set("UT", token_id, { secure: true, sameSite: "strict" });
  //         setSuccess(true);
  //         setTimeout(() => {
  //           router.push(`/${Lang}`);
  //         }, 3000);
  //       })
  //       .catch((err) => {
  //         setVerify(false);
  //         setSuccess(false);
  //         Cookies.remove("UT");
  //         setTimeout(() => {
  //           router.push(`/${Lang}/auth/signup`);
  //         }, 3000);
  //       });
  //   } else {
  //     router.push("/signup");
  //   }
  // }, [token_id, router, dispatch, Lang]);

  if (verify) {
    return (
      <LangWrap Lang={Lang}>
        <div className="container padding_all container_confirm">
          <div className="confrim_card">
            <h1 className="title">{t("confirm.success_signup")}</h1>
            <p>{t("confirm.wait")}</p>
          </div>
        </div>
      </LangWrap>
    );
  } else if (success) {
    return (
      <LangWrap Lang={Lang}>
        <div
          className="container padding_all container_confirm"
          style={{
            direction: Lang === "ar" ? "rtl" : "ltr",
          }}
        >
          <div className="confrim_card">
            <div className={"icon"}>
              <i className="checkmark">✓</i>
            </div>
            <h1 className="title">{t("auth.verify_success")}</h1>
            <p>{t("confirm.wait")}</p>
          </div>
        </div>
      </LangWrap>
    );
  } else if (!success) {
    return (
      <LangWrap Lang={Lang}>
        <div
          className="container padding_all container_confirm"
          style={{
            direction: Lang === "ar" ? "rtl" : "ltr",
          }}
        >
          <div className="failer_card">
            <div className={"icon"}>
              <i className="checkmark">x</i>
            </div>
            <h1 className="title">{t("confirm.failure")}</h1>
            <p>{t("confirm.sing_again")}</p>
          </div>
        </div>
      </LangWrap>
    );
  }
};

export default Verifivation;
export async function getServerSideProps({ params }) {
  // Fetch data from external API or CMS using params.id

  return {
    props: {
      token_id: params.token_id,
      Lang: params.Lang.toLowerCase(),
    },
  };
}
