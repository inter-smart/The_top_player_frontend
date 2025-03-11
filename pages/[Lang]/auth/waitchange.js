import { useTranslation } from "react-i18next";

const WaitCHange = () => {
  const { t } = useTranslation();
  return (
    <div className="container padding_all container_confirm">
      <div className="confrim_card">
        <h1 className="title">{t("confirm.sucess_verify")}</h1>
        <p>{t("confirm.check")}</p>
      </div>
    </div>
  );
};

export default WaitCHange;
