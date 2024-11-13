import { HiOutlineMailOpen } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaTiktok } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useDispatch } from "react-redux";
import { ContactReducer } from "@/store/AuthSlice";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

const Contact = ({ styles, Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.email) {
        errors.email = t("contact.req_email");
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = t("contact.invalid_email");
      }
      if (!data.name) {
        errors.name = t("contact.req_name");
      }
      if (!data.message) {
        errors.message = t("contact.req_messag");
      }
      return errors;
    },
    onSubmit: (data) => {
      if (data) {
        dispatch(ContactReducer(data))
          .unwrap()
          .then((res) => {
            show();
            formik.resetForm();
          })
          .catch((err) => {
            EMptyInput(err.response.data.message);
          });
      }
    },
  });

  const toast = useRef(null);
  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: `${mess}`,
      life: 3000,
    });
  };
  const show = () => {
    toast.current.show({
      severity: "success",
      summary: t("contact.success"),
    });
  };
  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : "";
  };
  return (
    <>
      <Toast ref={toast} />
      <div className={styles.contact_section}>
        <div className={"container"} id="contact">
          <div className="row">
            <div className="col-md-7">
              <h2 className="title">{t("contact.title")}</h2>
              <h3>{t("contact.intro")}</h3>
              <div className="row">
                <div className="col-6">
                  <div className={styles.social}>
                    <div className={styles.icon}>
                      <HiOutlineMailOpen />
                    </div>
                    <h4>{t("contact.email")}</h4>
                    <p>Info@thetopplayer.com</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.social}>
                    <div className={styles.icon}>
                      <FiPhoneCall />
                    </div>
                    <h4>{t("contact.WhatsApp")}</h4>
                    <p className={`${Lang === "ar" ? "Ar_contact_num" : ""} En_num2`}>+971-50-122-5632</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.social}>
                    <div className={styles.icon}>
                      <GrLocation />
                    </div>
                    <h4>{t("contact.Location")}</h4>
                    <p>{t("contact.united")}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className={styles.social}>
                    <div className={styles.icon}>
                      <IoShareSocialOutline />
                    </div>
                    <h4>{t("contact.social")}</h4>
                    <div className={styles.iconsSec}>
                      <a
                        style={{ textDecoration: "none" }}
                        aria-label="oufacebook"
                        href={"https://www.tiktok.com/@thetop.player?_t=8i0wA2PQnHc&_r=1"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.span_div}
                      >
                        <FaTiktok />
                      </a>

                      <a
                        style={{ textDecoration: "none" }}
                        aria-label="our instagram"
                        href={"https://www.instagram.com/thetop.player/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.span_div}
                      >
                        <A style={{ textDecoration: "none" }} iFillInstagram />
                      </a>

                      <a
                        style={{ textDecoration: "none" }}
                        aria-label="our whatsapp "
                        href={
                          "https://api.whatsapp.com/send/?phone=971501225632&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%2C+%D8%B9%D9%86%D8%AF%D9%8A+%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1+%D8%A8%D8%AE%D8%B5%D9%88%D8%B5&type=phone_number&app_absent=0"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.span_div}
                      >
                        <BsWhatsapp />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <form onSubmit={formik.handleSubmit} className={`${styles.formWrap} grid gap-2 contact`}>
                <div className={`${styles.formRow} row`}>
                  <div className="col-12">
                    <div className="inputFormik">
                      <label htmlFor="password"> {t("contact.name")}</label>
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
                      <label htmlFor="email">{t("contact.email")} </label>
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
                    <div className="inputFormik">
                      <label htmlFor="email">{t("contact.message")} </label>

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
                    <button name="login" type="submit" className="submit-button hoveranim">
                      <span> {t("contact.send")}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
