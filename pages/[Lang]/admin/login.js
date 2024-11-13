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
import { LoginReducer } from "@/store/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import Fingerprint2 from "fingerprintjs2";
import LangWrap from "@/components/layouts/LangWarp";
import { getsubscribedCourse } from "@/store/CourcesSlice";

const Login = ({ Lang }) => {
  const [disabel, setDisabed] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [device_id, setDevice_id] = useState("");
  const [courseId, setCourseid] = useState(null);
  const [tamraId, setTamaraid] = useState(null);

  useEffect(() => {
    const courseId = sessionStorage.getItem("courseId");
    const tamaraId = sessionStorage.getItem("tamaraId");
    setCourseid(courseId);
    setTamaraid(tamaraId);
  }, []);

  useEffect(() => {
    if (Cookies.get("UT") && !courseId && !tamraId) {
      router.push(`/${Lang}`);
    }
  }, [Cookies.get("UT")]);

  useEffect(() => {
    // Generate device fingerprint using fingerprintjs2
    Fingerprint2.get({}, function (components) {
      const fingerprint = Fingerprint2.x64hash128(
        components.map((pair) => pair.value).join(),
        31
      );
      setDevice_id(fingerprint);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.email) {
        errors.email = t("auth.req_email");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = t("auth.invalid_email");
      }
      if (!data.password) {
        errors.password = t("auth.req_password");
      }
      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        setDisabed(true);
        const result = {
          ...data,
          deviceId: device_id,
        };
        dispatch(LoginReducer(result))
          .unwrap()
          .then((res) => {
            Cookies.set("UT", res.accessToken, {
              secure: true,
              sameSite: "strict",
              expires: 90,
            });
            show();

            if (!res.verified) {
              console.log("here 2");
              router.push({
                pathname: `/${Lang}/admin/sign-verify`,
                query: { email: data.email },
              });
            }
            dispatch(getsubscribedCourse(res.accessToken))
              .unwrap()
              .then(() => {
                formik.resetForm();
                if (courseId) {
                  sessionStorage.removeItem("courseId");
                  router.push(`/${Lang}/user/payment/${courseId}`);
                  setDisabed(false);
                  return;
                } else if (tamraId) {
                  sessionStorage.removeItem("tamaraId");
                  router.push(`/${Lang}/user/payment/tamara/${tamraId}`);
                  setDisabed(false);
                  return;
                } else {
                  router.push(`/${Lang}`);
                  setDisabed(false);
                }
              })
              .catch((err) => {
                setDisabed(false);

                if (err?.response?.data?.message) {
                  EMptyInput(err.response.data.message);
                } else {
                  EMptyInput(t("auth.wrong"));
                }
                // EMptyInput()
              });
          })

          .catch((err) => {
            setDisabed(false);
            // console.log(err.response.data.verified)

            if (err?.response?.data?.verified === false) {
              // router.push({
              //   pathname: `/${Lang}/admin/reverification`,
              // });
              router.push({
                pathname: `/${Lang}/admin/sign-verify`,
                query: { email: data.email },
              });
            }
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
      summary: t("auth.succ_login"),
      // detail: formik.values.value,
    });
  };
  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      ""
    );
  };

  const handleKeyPress = (event) => {
    console.log("enter key pressed");
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      formik.handleSubmit(); // Manually submit the form
    }
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
          <Image
            src={"/images/dElmt-countBg-1.svg"}
            layout="fill"
            alt="bg"
            objectFit="contain"
          />
        </div>
        {/* <div className={styles.Image_bottom_left}>
        <Image
          src={"/images/login.png"}
          alt="Login"
          layout="fill"
          objectFit="contain"
        />
      </div> */}
        <div className={styles.Login_card}>
          {/* <div className={styles.Image_Login}>
          <Image
            src={"/images/logo.png"}
            alt="Login"
            layout="fill"
            objectFit="contain"
          />
        </div> */}
          <h1>{t("auth.login_title")}</h1>

          <form
            onSubmit={formik.handleSubmit}
            className="grid  gap-2"
            onKeyDown={handleKeyPress}
          >
            <div className="col-12">
              <div className="inputFormik">
                <label htmlFor="email">{t("auth.email")} </label>
                <InputText
                  name="email"
                  className={classNames({
                    "p-invalid": isFormFieldInvalid("email"),
                  })}
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                />
                {getFormErrorMessage("email")}
              </div>
            </div>

            <div className="col-12">
              <div className={`inputFormik ${Lang === "ar" ? "Ar_Sign" : ""}`}>
                <label htmlFor="password"> {t("auth.password")}</label>
                <Password
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
            <button
              name="login"
              disabled={disabel}
              type="submit"
              className={`submit-button ${disabel == true && "LoadingButton"}`}
            >
              {t("auth.login")}
            </button>
            <div className={styles.have_account}>
              <p
                style={{
                  marginRight: Lang === "ar" ? "0" : "10px",
                  marginLeft: Lang === "ar" ? "10px" : "0",
                }}
              >
                {t("auth.forget")}{" "}
                <Link href={`/${Lang}/admin/forget`} style={{textDecoration:"none"}}>{t("auth.change")}</Link>
              </p>
            </div>
            <div className={styles.have_account}>
              <p
                style={{
                  marginRight: Lang === "ar" ? "0" : "10px",
                  marginLeft: Lang === "ar" ? "10px" : "0",
                }}
              >
                {t("auth.donthave")}
                <Link href={`/${Lang}/admin/signup`} style={{textDecoration:"none"}}>{t("auth.signup")}</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </LangWrap>
  );
};

export default Login;
export async function getServerSideProps({ params }) {
  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
