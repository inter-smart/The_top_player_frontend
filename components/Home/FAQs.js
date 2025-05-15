import { getAllFaq } from "@/store/FaqSlice";
import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { PiPencilSimpleLine } from "react-icons/pi";

const FAQs = ({ styles, Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { faqs } = useSelector((state) => state?.FaqSlice?.faqs);

  useEffect(() => {
    dispatch(getAllFaq());
  }, [dispatch]);

  return (
    <div className={`${styles.faq_section} margin_top `} id="faq">
      <div className="container ">
        <div className={styles.FAQs}>
          <h2
            className={`title ${styles.title}`}
            style={{
              lineHeight: Lang === "ar" ? "normal" : "38px",
              textTransform: "none",
            }}
          >
            {t("faqs.title")}
          </h2>

          <div className={`${styles.FaqAcc}  ${Lang === "ar" ? "AR_FaqAcc" : "EN_FaqAcc"}`}>
            <Accordion>
              {faqs && faqs.length > 0 ? (
                faqs.map((faq, i) => (
                  <Accordion.Item eventKey={i} key={faq?.id}>
                    <Accordion.Header>
                      <div className={`${styles.FAQ_info} FAQ_info_ar`}>
                        <h6> {Lang === "en" ? faq?.question_en : faq?.question_ar}</h6>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p className={styles.FAQ_P}> {Lang === "en" ? faq?.answer_en : faq?.answer_ar}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))
              ) : (
                <div>No FAQs available</div>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
