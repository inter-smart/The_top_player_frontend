import Image from "next/legacy/image";
import { useTranslation } from "react-i18next";
import { FaDumbbell } from "react-icons/fa";

const FootballProgram = ({ styles, Lang }) => {
  const { t } = useTranslation();
  return (
    <div className={Lang === "ar" ? "progrss_ar" : "progrss_en"}>
      <div className="row align-items-center justify-content-between">
        <div className="col-md-8">
          <h1 className="title">{t("programs_details.football.title")}</h1>

          <p className={styles.program_p_2}>{t("programs_details.contain")}</p>

          <div className={`${styles.Program} ${Lang === "ar" ? styles.Ar_program : ""}`}>
            <ul>
              <li>
                <div className={styles.check}>
                  <span className={styles.dumbel}>
                    <FaDumbbell />
                  </span>
                  <p>
                    {t("programs.football.line1_1")}
                    <span className="En_num">{t("programs.football.line1_2")}</span>
                    {t("programs.football.line1_3")}
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.check}>
                  <span className={styles.dumbel}>
                    <FaDumbbell />
                  </span>
                  <p>
                    <span className="En_num">{t("programs.football.line2_1")}</span>
                    {t("programs.football.line2_2")}
                    <span className="En_num">{t("programs.football.line2_3")}</span>
                    {t("programs.football.line2_4")}
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.check}>
                  <span className={styles.dumbel}>
                    <FaDumbbell />
                  </span>
                  <p>
                    {t("programs.football.line3_1")}
                    <span className="En_num">{t("programs.football.line3_2")}</span>
                    {t("programs.football.line3_3")}
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.check}>
                  <span className={styles.dumbel}>
                    <FaDumbbell />
                  </span>
                  <p>{t("programs_details.football.line4")}</p>
                </div>
              </li>

              <li>
                <div className={styles.check}>
                  <span className={styles.dumbel}>
                    <FaDumbbell />
                  </span>
                  <p>
                    {t("programs.football.line5_1")}

                    <span className="En_num">{t("programs.football.line5_2")}</span>
                    {t("programs.football.line5_3")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className={styles.card_image}>
            <Image src={"/images/3.png"} alt="fitness" layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballProgram;
