import styles from "@/styles/Coupon.module.scss";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { applyCoupon, resetCoupon } from "@/store/CouponSlice";
import { BiSolidOffer } from "react-icons/bi";
import { PiTicketThin } from "react-icons/pi";
import { CiGift } from "react-icons/ci";
import { IoGift } from "react-icons/io5";
import { FALSE } from "sass";

const Coupon = ({ courseAmount, Lang, currentCurrency }) => {
  const [coupon, setCoupon] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const toast = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const coupon_code = coupon;
    try {
      setError("");
      const result = await dispatch(
        applyCoupon({ coupon_code, courseAmount, currentCurrency })
      ).unwrap();
      setSuccess(true);
    } catch (error) {

      setSuccess(false);
      setError(error);
      console.error("Failed to apply coupon:", error);
    }
  };

  const handleRemove = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setCoupon("");
    dispatch(resetCoupon());
  };

  return (
    <>
      <form
        onSubmit={success ? handleRemove : handleSubmit}
        className={styles.couponWrap}
      >
        <div className={styles.CouponLabel}>
          <label>{t("payment.add_code")}</label>
        </div>
        <div className={styles.inputWrap}>
          <input
            value={coupon}
            onChange={(e) => {
              dispatch(resetCoupon());
              setSuccess(false);
              setCoupon(e.target.value);
            }}
            placeholder={t("payment.add_code")}
          />
          <PiTicketThin className={styles.iconPlaceholder} />
        </div>
        {error && (
          <small className={styles.error}>
            {Lang == "en" ? error?.error_en : error?.error_ar}
          </small>
        )}
        {success && (
          <div className={styles.successWrap}>
            <BiSolidOffer style={{ color: "green", fontSize: "25px" }} />
            <span>{t("payment.applied")}</span>
          </div>
        )}
        <button type="submit" name="subscribe">
          <IoGift />
          <span>{success ? t("payment.remove") : t("payment.apply")}</span>
        </button>
      </form>
    </>
  );
};

export default Coupon;
