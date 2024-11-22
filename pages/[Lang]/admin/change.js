import styles from "@/styles/Login.module.css";
import Image from "next/legacy/image";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Link from "next/link";
import { VerifyEmail, changePassword } from "@/store/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LangWrap from "@/components/layouts/LangWarp";
import Fingerprint2 from "fingerprintjs2";
import Cookies from "js-cookie";
const Change = ({ Lang }) => {
  const [disabel, setDisabed] = useState(false);
  // const [disabelResend, setDisabedResend] = useState(false);
  // console.log(Lang)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [courseId, setCourseid] = useState(null);
  const [tamaraId, setTamaraid] = useState(null);
  const [isFree, setIsFree] = useState(null);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("courseId");
    const tamId = sessionStorage.getItem("tamaraId");
    const isFree = sessionStorage.getItem("isFree");
    setCourseid(id);
    setTamaraid(tamId);
    setIsFree(isFree);
  }, []);

  useEffect(() => {
    // Generate device fingerprint using fingerprintjs2
    Fingerprint2.get({}, function (components) {
      const fingerprint = Fingerprint2.x64hash128(components.map((pair) => pair.value).join(), 31);
      setDeviceId(fingerprint);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      code: "",
      // confirm_password: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.password) {
        errors.password = t("auth.req_password");
      }
      if (!data.code) {
        errors.code = t("auth.req_code");
      }
      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        setDisabed(true);
        const result = {
          newpassword: data.password,
          email: router.query.email,
          verification_code: data.code,
          deviceId: deviceId,
        };
        dispatch(changePassword(result))
          .unwrap()
          .then((res) => {
            Cookies.set("UT", res.accessToken, {
              secure: true,
              sameSite: "strict",
              expires: 90,
            });

            show("Success");
            formik.resetForm();
            setDisabed(false);
            if (courseId) {
              if (isFree) {
                router.push(`/${Lang}/user/programs/details/${courseId}`);
              } else {
                router.push(`/${Lang}/user/payment/${courseId}`);
              }
              sessionStorage.removeItem("courseId");
              sessionStorage.removeItem("isFree");
            } else if (tamaraId) {
              if (isFree) {
                router.push(`/${Lang}/user/camps/details/${tamaraId}`);
              } else {
                router.push(`/${Lang}/user/payment/tamara/${tamaraId}`);
              }
              sessionStorage.removeItem("tamaraId");
              sessionStorage.removeItem("isFree");
            } else {
              router.push(`/${Lang}`);
            }
          })
          .catch((err) => {
            console.log(err);
            setDisabed(false);
            // console.log(err.response.data.message)
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
      summary: t("auth.password_reset"),
      // detail: formik.values.value,
    });
  };

  const show1 = () => {
    toast.current.show({
      severity: "success",
      summary: "Please check your email !",
      // detail: formik.values.value,
    });
  };
  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : "";
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    const result = {
      email: router.query.email,
      symbol: Lang,
    };
    dispatch(VerifyEmail(result))
      .unwrap()
      .then((res) => {
        // alert("Please check your email!");
        show1(t("auth.check"));
        // show(t("Please check your mail"));
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          EMptyInput(err.response.data.message);
        } else {
          EMptyInput(t("auth.wrong"));
        }
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
          <h1>{t("auth.change_pass")}</h1>

          <form onSubmit={formik.handleSubmit} className="grid  gap-2">
            <div className="col-12">
              <div className={`inputFormik ${Lang === "ar" ? "Ar_Sign" : ""}`}>
                <label htmlFor="password"> {t("auth.new_password")}</label>
                <Password
                  placeholder={"*************"}
                  toggleMask
                  name="password"
                  className={`${classNames({
                    "p-invalid": isFormFieldInvalid("password"),
                  })} w-full `}
                  value={formik.values.password}
                  feedback={false}
                  onChange={(e) => {
                    formik.setFieldValue("password", e.target.value);
                  }}
                />

                {getFormErrorMessage("password")}
              </div>
            </div>
            <div className="col-12">
              <div className="inputFormik">
                <label htmlFor="code">{t("auth.code")} </label>
                <InputText
                  placeholder="Enter OTP code"
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
            <button name="login" type="submit" disabled={disabel} className={`submit-button ${disabel == true && "LoadingButton"}`}>
              {t("auth.send")}
            </button>

            <div className={styles.have_account}>
              <p
                style={{
                  marginRight: Lang === "ar" ? "0" : "10px",
                  marginLeft: Lang === "ar" ? "10px" : "0",
                }}
              >
                {t("auth.didn't_receive")}
              </p>
              <Link href={`#`} onClick={handleResendOtp}>
                {t("auth.send_again")}
              </Link>
            </div>

            <div className={styles.have_account}>
              <p
                style={{
                  marginRight: Lang === "ar" ? "0" : "10px",
                  marginLeft: Lang === "ar" ? "10px" : "0",
                }}
              >
                {t("auth.have_account")}
              </p>
              <Link href={`/${Lang}/admin/login`}>{t("auth.login")}</Link>
            </div>
          </form>
        </div>
      </div>
    </LangWrap>
  );
};

export default Change;
export async function getServerSideProps({ params }) {
  // Fetch data from external API or CMS using params.id

  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
