import styles from "@/styles/Login.module.css";
import Image from "next/legacy/image";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { SignUp } from "@/store/AuthSlice";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Checkbox } from "primereact/checkbox";
import Fingerprint2 from "fingerprintjs2";
import LangWrap from "@/components/layouts/LangWarp";
const Signup = ({ Lang }) => {
  const [device_id, setDevice_id] = useState("");
  const [disabel, setDisabed] = useState(false);
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

  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      name: "",
      phone: "",
      checked: false,
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
      if (!data.name) {
        errors.name = t("auth.req_name");
      }
      if (!data.checked) {
        errors.checked = t("auth.req_accept");
      }
      if (!data.phone) {
        errors.phone = t("auth.req_mobile");
      }
      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        setDisabed(true);
        const result = {
          username: data.name,
          email: data.email,
          password: data.password,
          deviceId: device_id,
          mobile: data.phone,
          symbol: Lang,
        };
        dispatch(SignUp(result))
          .unwrap()
          .then((res) => {
            // alert("Successfully signed up!");
            setDisabed(false);
            show(t("auth.check"));
            formik.resetForm();
            setTimeout(() => {
              router.push({
                pathname: `/${Lang}/admin/sign-verify`,
                query: { email: data.email },
              });
            }, 1500);
          })
          .catch((err) => {
            setDisabed(false);
            if (err?.response?.data?.message) {
              EMptyInput(err.response.data.message);
            } else {
              EMptyInput(t("auth.wrong"));
            }
          });
      }
    },
  });

  const toast = useRef(null);
  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: "Info",
      detail: `${mess}`,
      // life: 3000,
    });
  };
  const show = (e) => {
    toast.current.show({
      severity: "success",
      summary: "Info",
      detail: e,
      life: 6000,
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
        <div className="card flex justify-content-center"></div>
        <div className={styles.Login_card}>
          {/* <div className={styles.Image_Login}>
          <Image
            src={"/images/logo.png"}
            alt="Login"
            layout="fill"
            objectFit="contain"
          />
        </div> */}
          <h1>{t("auth.signup_title")}</h1>

          <form onSubmit={formik.handleSubmit} className="grid  gap-2">
            <div className="col-12">
              <div className="inputFormik">
                <label htmlFor="name">{t("auth.name")} </label>
                <InputText
                  name="name"
                  className={classNames({
                    "p-invalid": isFormFieldInvalid("name"),
                  })}
                  value={formik.values.name}
                  onChange={(e) => {
                    formik.setFieldValue("name", e.target.value);
                  }}
                />
                {getFormErrorMessage("name")}
              </div>
            </div>
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
            <div className="col-md-12">
              <div className="inputFormik">
                <label htmlFor="phone">{t("auth.mobile")} </label>
                {/* <InputText
                  keyfilter={"int"}
                  name="phone"
                  className={classNames({
                    "p-invalid": isFormFieldInvalid("phone"),
                  })}
                  value={formik.values.phone}
                  onChange={(e) => {
                    formik.setFieldValue("phone", e.target.value);
                  }}
                /> */}

                <PhoneInput
                  style={{
                    direction: Lang === "ar" ? "rtl" : "ltr",
                  }}
                  international
                  defaultCountry="AE"
                  value={formik.values.phone}
                  onChange={(e) => {
                    // console.log(e)
                    formik.setFieldValue("phone", e);
                  }}
                />
                {getFormErrorMessage("phone")}
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

            <div className="col-12">
              <div className={styles.checkFormik}>
                <Checkbox
                  id="checked"
                  name="checked"
                  checked={formik.values.checked}
                  className={classNames({
                    "p-invalid": isFormFieldInvalid("checked"),
                  })}
                  onChange={(e) => {
                    formik.setFieldValue("checked", e.checked);
                  }}
                ></Checkbox>
                <label
                  htmlFor="checked"
                  style={{
                    marginRight: Lang === "ar" ? "10px" : "0",
                    marginLeft: Lang === "ar" ? "0" : "10px",
                  }}
                >
                  <span>{t("auth.condition")} &nbsp;</span>

                  <Link href={`/${Lang}/terms`} target="_blank" style={{textDecoration:"none"}}>
                    {t("auth.terms")}
                  </Link>
                </label>
              </div>
              {getFormErrorMessage("checked")}
            </div>
            <button
              name="login"
              disabled={disabel}
              type="submit"
              className={`submit-button ${disabel == true && "LoadingButton"}`}
            >
              {t("auth.signup")}
            </button>
            <div className={styles.have_account}>
              <p
                style={{
                  marginRight: Lang === "ar" ? "0" : "10px",
                  marginLeft: Lang === "ar" ? "10px" : "0",
                }}
              >
                {" "}
                {t("auth.have_account")}{" "}
                <Link href={`/${Lang}/admin/login`} style={{textDecoration:"none"}}>{t("auth.login")}</Link>
              </p>
            </div>
          </form>

          {/* <div className="LoginPage">
          <div className="container">
            <div className="grid justify-content-center align-items-center">
              <div className="col-12 md:col-4 Login-card">
                
                
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </LangWrap>
  );
};

export default Signup;
export async function getServerSideProps({ params }) {
  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
