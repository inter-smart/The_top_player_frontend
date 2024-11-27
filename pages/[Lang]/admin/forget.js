import styles from "@/styles/Login.module.css";
import Image from "next/legacy/image";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { VerifyEmail } from "@/store/AuthSlice";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LangWrap from "@/components/layouts/LangWarp";
const Signup = ({ Lang }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [disabel, setDisabed] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      name: "",
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
      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        setDisabed(true);
        const result = {
          email: data.email,
          symbol: Lang,
        };
        dispatch(VerifyEmail(result))
          .unwrap()
          .then((res) => {
            // alert("Successfully signed up!");
            show(t("auth.succ_signup"));
            formik.resetForm();
            router.push({
              pathname: `/${Lang}/admin/change`,
              query: {
                email: data.email,
              },
            });
            setDisabed(false);
          })
          .catch((err) => {
            //console.log(err);
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
  //   const show = () => {
  //     toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content',  life: 200000,});
  // };
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
        <div className="card flex justify-content-center">
        </div>
        <div className={styles.Login_card}>
          {/* <div className={styles.Image_Login}>
          <Image
            src={"/images/logo.png"}
            alt="Login"
            layout="fill"
            objectFit="contain"
          />
        </div> */}
          <h1>{t("auth.verify_email")}</h1>

          <form onSubmit={formik.handleSubmit} className="grid  gap-2">
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

            <button
              name="login"
              type="submit"
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
                {t("auth.have_account")}
                <Link href={`/${Lang}/admin/login`} style={{textDecoration:"none"}}>{t("auth.login")}</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </LangWrap>
  );
};

export default Signup;
export async function getServerSideProps({ params }) {
  // Fetch data from external API or CMS using params.id

  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
