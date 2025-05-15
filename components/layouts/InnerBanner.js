import Image from "next/legacy/image";
import styles from "/styles/InnerBanner.module.scss";

const InnerBanner = ({ imageUrl, title, title_ar, Lang }) => {
  return (
    <div className={styles.inner_banner}>
      <div className={styles.bgImg}>
        <Image
          src={imageUrl}
          layout={"fill"}
          objectFit={"cover"}
          alt={"banner-program"}
          priority
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              100vw"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.dFlx}>
          <div className={styles.cntWrap}>
            {Lang == "en" ? (
              <h1 className={styles.mHd}>{title?.toUpperCase()}</h1>
            ) : (
              <h1 className={styles.mHd}>{title_ar}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerBanner;
