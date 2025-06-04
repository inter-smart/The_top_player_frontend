import styles from "@/styles/Login.module.css";
// import Image from "next/legacy/image";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Link from "next/link";
import { changePassword, updatePassword } from "@/store/AuthSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LangWrap from "@/components/layouts/LangWarp";
const UpdatePassword = ({ Lang }) => {
  const [disabel, setDisabed] = useState(false);
  // const [disabelResend, setDisabedResend] = useState(false);
  // //console.log(Lang)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.oldPassword) {
        errors.oldPassword = t("auth.req_password");
      }
      if (!data.newPassword) {
        errors.newPassword = t("auth.req_password");
      }
      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        setDisabed(true);
        const result = {
          newpassword: data.newPassword,
          oldpassword: data.oldPassword,
        };
        dispatch(updatePassword(result))
          .unwrap()
          .then((res) => {
            show("Success");
            formik.resetForm();
            setDisabed(false);

            setTimeout(() => {
              router.push(`/${Lang}`);
              // router.push(`/${Lang}/user/profile`);
            }, 1000);
          })
          .catch((err) => {
            setDisabed(false);
            // //console.log(err.response.data.message)
            // if (err?.response?.data?.message) {
            //   EMptyInput(err.response.data.message);
            // } else {
            //   EMptyInput(t("auth.wrong"));
            // }
            EMptyInput(err)
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
  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : "";
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
        <div className={styles.Login_card}>
          <h1>{t("auth.change_pass")}</h1>

          <form onSubmit={formik.handleSubmit} className="grid  gap-2">
            <div className="col-12">
              <div className={`inputFormik ${Lang === "ar" ? "Ar_Sign" : ""}`}>
                <label htmlFor="oldPassword"> {t("auth.old_password")}</label>
                <Password
                  placeholder={"*************"}
                  toggleMask
                  name="oldPassword"
                  className={`${classNames({
                    "p-invalid": isFormFieldInvalid("oldPassword"),
                  })} w-full `}
                  value={formik.values.oldPassword}
                  feedback={false}
                  onChange={(e) => {
                    formik.setFieldValue("oldPassword", e.target.value);
                  }}
                />

                {getFormErrorMessage("oldPassword")}
              </div>
            </div>
            <div className="col-12">
              <div className={`inputFormik ${Lang === "ar" ? "Ar_Sign" : ""}`}>
                <label htmlFor="newPassword"> {t("auth.new_password")}</label>
                <Password
                  placeholder={"*************"}
                  toggleMask
                  name="newPassword"
                  className={`${classNames({
                    "p-invalid": isFormFieldInvalid("newPassword"),
                  })} w-full `}
                  value={formik.values.newPassword}
                  feedback={false}
                  onChange={(e) => {
                    formik.setFieldValue("newPassword", e.target.value);
                  }}
                />

                {getFormErrorMessage("newPassword")}
              </div>
            </div>
            <button
              name="login"
              type="submit"
              disabled={disabel}
              className={`submit-button ${disabel == true && "LoadingButton"}`}
            >
              {t("auth.send")}
            </button>

            <div className={styles.have_account}>
              <p
                style={{
                  marginRight: Lang === "ar" ? "0" : "10px",
                  marginLeft: Lang === "ar" ? "10px" : "0",
                }}
              >
                {t("auth.forget")}
                <Link href={`/${Lang}/user/forget`} style={{textDecoration:"none"}}>{t("auth.change")}</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </LangWrap>
  );
};

export default UpdatePassword;
export async function getServerSideProps({ params }) {
  // Fetch data from external API or CMS using params.id

  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
