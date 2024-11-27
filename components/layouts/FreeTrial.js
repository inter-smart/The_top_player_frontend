import navbarStyles from "@/styles/Navbar.module.scss";
import shareStyles from "@/styles/Share.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const FreeTrial = ({ Lang }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleFreeTrial = () => {
    sessionStorage.setItem("courseId", process.env.FREE_COURSE_ID);
    sessionStorage.setItem("subId", process.env.FREE_SUB_ID);
    sessionStorage.setItem("isFree", "true");
    router.push(`/${Lang}/admin/login`); 
  };

  return (
    <div className={shareStyles.freeTrial} onClick={handleFreeTrial}>
      <span className={shareStyles.free_trial_text}>{t("programs.free_trial")}</span>
    </div>
  );
};

export default FreeTrial;
