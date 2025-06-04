import styles from "@/styles/Login.module.css";
import Image from "next/legacy/image";
// import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
// import Link from "next/link";
import { ReVerifySignup, VerifySignup } from "@/store/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
// import Fingerprint2 from "fingerprintjs2";
import LangWrap from "@/components/layouts/LangWarp";

const SignVerify = ({ Lang }) => {
  const [disabel, setDisabed] = useState(false);
  const [disabelResend, setDisabedResend] = useState(false);

  const [courseId, setCourseid] = useState(null);
  const [tamaraId, setTamaraid] = useState(null);
  const [isFree, setIsFree] = useState(null);
  const [subId, setSubId] = useState(null);

  // const router = useRouter()
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const id = sessionStorage.getItem("courseId");
    const tamId = sessionStorage.getItem("tamaraId");
    const isFree = sessionStorage.getItem("isFree");
    const subId = sessionStorage.getItem("subId");
    setCourseid(id);
    setTamaraid(tamId);
    setIsFree(isFree);
    setSubId(subId);
  }, []);
  // //console.log(router);
  // const [device_id, setDevice_id] = useState("");

  // useEffect(() => {
  //   // Generate device fingerprint using fingerprintjs2
  //   Fingerprint2.get({}, function (components) {
  //     const fingerprint = Fingerprint2.x64hash128(
  //       components.map((pair) => pair.value).join(),
  //       31
  //     );
  //     setDevice_id(fingerprint);
  //   });
  // }, []);
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.code) {
        errors.code = t("auth.req_code");
      }
      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        setDisabed(true);
        const result = {
          verify_code: data.code,
          email: router.query.email,
        };
        dispatch(VerifySignup(result))
          .unwrap()
          .then((res) => {
            Cookies.set("UT", res.accessToken, {
              secure: true,
              sameSite: "strict",
              expires: 90,
            });
            show(t("auth.succ_login"));
            formik.resetForm();
            setDisabed(false);
            //console.log("Here");
            if (courseId) {
              if (isFree) {
                router.push(`/${Lang}/user/programs/details/${courseId}/sub/${subId}`);
                sessionStorage.removeItem("subId");
              } else {
                router.push(`/${Lang}/user/payment/${courseId}`);
              }
              sessionStorage.removeItem("courseId");
              sessionStorage.removeItem("isFree");
              return;
            } else if (tamaraId) {
              if (isFree) {
                router.push(`/${Lang}/user/camps/details/${tamaraId}`);
              } else {
                router.push(`/${Lang}/user/payment/tamara/${tamaraId}`);
              }
              sessionStorage.removeItem("tamaraId");
              sessionStorage.removeItem("isFree");
              return;
            } else {
              router.push(`/${Lang}`);
            }
          })
          .catch((err) => {
            setDisabed(false);
            // if (err?.response?.data?.message) {
            //   EMptyInput(err.response.data.message);
            // } else {
            //   EMptyInput(t("auth.wrong"));
            // }
            EMptyInput(err);
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
  const show = (text) => {
    toast.current.show({
      severity: "success",
      summary: text,
      // detail: formik.values.value,
    });
  };
  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : "";
  };

  const Resend = () => {
    const data = {
      email: router.query.email,
    };
    setDisabedResend(true);
    dispatch(ReVerifySignup(data))
      .unwrap()
      .then((res) => {
        show("Email sent");
        formik.resetForm();
        setDisabed(false);
        setDisabedResend(false);
      })
      .catch((err) => {
        setDisabed(false);
        setDisabedResend(false);
        // if (err?.response?.data?.message) {
        //   EMptyInput(err.response.data.message);
        // } else {
        //   EMptyInput(t("auth.wrong"));
        // }
        EMptyInput(err);
      });
  };
  return (
    <LangWrap Lang={Lang}>
      <Toast ref={toast} />

      <div
        className={styles.Login}
        style={{
          direction: Lang === "ar" ? "rtl" : "ltr",
        }}
      >
        <div className={styles.dElmt_1}>
          <Image src={"/images/dElmt-countBg-1.svg"} layout="fill" alt="bg" objectFit="contain" />
        </div>

        <div className={styles.Login_card}>
          <h1>{t("auth.code_title")}</h1>

          <form onSubmit={formik.handleSubmit} className="grid  gap-2">
            <div className="col-12">
              <div className="inputFormik">
                <label htmlFor="code">{t("auth.code")} </label>
                <InputText
                  name="code"
                  className={classNames({
                    "p-invalid": isFormFieldInvalid("code"),
                  })}
                  value={formik.values.code}
                  onChange={(e) => {
                    formik.setFieldValue("code", e.target.value);
                  }}
                />
                {getFormErrorMessage("code")}
              </div>
            </div>

            <button name="login" disabled={disabel} type="submit" className={`submit-button ${disabel == true && "LoadingButton"}`}>
              {t("auth.Verify")}
            </button>

            <div className={styles.have_account}>
              <p
                style={{
                  marginRight: Lang === "ar" ? "0" : "10px",
                  marginLeft: Lang === "ar" ? "10px" : "0",
                }}
              >
                {t("auth.not_recived")}
              </p>
              <button onClick={() => Resend()} disabled={disabelResend} className={`${disabelResend == true && "Disabelresend"}`}>
                {t("auth.send_again")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LangWrap>
  );
};

export default SignVerify;
export async function getServerSideProps({ params }) {
  // Fetch data from external API or CMS using params.id

  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
