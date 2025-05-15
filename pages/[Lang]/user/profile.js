import styles from "@/styles/Profile.module.scss";
// import Image from "next/legacy/image";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useDispatch } from "react-redux";
import { getUserInfo, updateUserInfo } from "@/store/AuthSlice";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import LangWrap from "@/components/layouts/LangWarp";
const Profile = ({ Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      F_name: "",
      phone: "",
      message: "",
      email: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.F_name) {
        errors.F_name = t("auth.req_name");
      }

      if (!data.phone) {
        errors.phone = t("auth.req_mobile");
      }

      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        const result = {
          username: data.F_name,
          mobile: data.phone,
          bio: data.message,
        };

        dispatch(updateUserInfo(result))
          .unwrap()
          .then((res) => {
            show();
            formik.resetForm();
          })
          .catch((err) => {
            // //console.log(err.response.data.message)
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

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      ""
    );
  };
  const router = useRouter();
  useEffect(() => {
    if (!formik.values.F_name) {
      dispatch(getUserInfo())
        .unwrap()
        .then((res) => {
          formik.setFieldValue("F_name", res?.username ? res?.username : "");
          formik.setFieldValue("phone", res?.mobile ? res?.mobile : "");
          formik.setFieldValue("message", res?.bio ? res?.bio : "");
          formik.setFieldValue("email", res?.email ? res?.email : "");
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            Cookies.remove("UT");
            router.push(`/${Lang}`);
          }
        });
    }
  }, [dispatch, formik, Lang, router]);

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
      summary: t("auth.succ_update"),
      // detail: formik.values.value,
    });
  };
  return (
    <LangWrap Lang={Lang}>
      <div className={"inner_section_outer"}>
        <div className={styles.profile_section}>
          <div className="container ">
            <Toast ref={toast} />
            <div
              className={styles.profile_box}
              style={{
                direction: Lang === "ar" ? "rtl" : "ltr",
              }}
            >
              <div className={"tleWrap"}>
                <div className="mTle">{t("auth.basic_information")}</div>
              </div>
              <form onSubmit={formik.handleSubmit} className={styles.formWrap}>
                <div className={`${styles.formRow} row`}>
                  <div className="col-md-4">
                    <div className="inputFormik">
                      <label htmlFor="F_name"> {t("auth.name")}</label>
                      <InputText
                        name="F_name"
                        className={classNames({
                          "p-invalid": isFormFieldInvalid("F_name"),
                        })}
                        value={formik.values.F_name}
                        onChange={(e) => {
                          formik.setFieldValue("F_name", e.target.value);
                        }}
                      />
                      {getFormErrorMessage("F_name")}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="inputFormik">
                      <label htmlFor="Email"> {t("auth.email")}</label>
                      <InputText
                        name="email"
                        value={formik.values.email}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="inputFormik">
                      <label htmlFor="phone">{t("auth.mobile")} </label>
                      <InputText
                        name="phone"
                        className={classNames({
                          "p-invalid": isFormFieldInvalid("phone"),
                        })}
                        value={formik.values.phone}
                        onChange={(e) => {
                          formik.setFieldValue("phone", e.target.value);
                        }}
                      />
                      {getFormErrorMessage("phone")}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="inputFormik">
                      <label htmlFor="email">{t("auth.about")} </label>

                      <InputTextarea
                        name="message"
                        className={classNames({
                          "p-invalid": isFormFieldInvalid("message"),
                        })}
                        value={formik.values.message}
                        onChange={(e) => {
                          formik.setFieldValue("message", e.target.value);
                        }}
                        rows={5}
                        cols={10}
                      />
                      {getFormErrorMessage("message")}
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      name="login"
                      type="submit"
                      className={`${styles.submit_button} submit-button`}
                    >
                      {t("auth.send")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LangWrap>
  );
};

export default Profile;
export async function getServerSideProps({ params }) {
  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
