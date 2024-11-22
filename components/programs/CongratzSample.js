import Image from "next/image";
import { useTranslation } from "react-i18next";
import styles from "@/styles/Congratulation.module.scss";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SampleCongrats = () => {
    const { t } = useTranslation();


    return (
        <div className={styles.enrollProgram_section}>
            <div className={`${styles.container} container`}>
                <div className={styles.enrollProgramBx}>
                    <div className={styles.dlmt_bg_2}>
                        <Image className={styles.elmt_1} src="/images/congratulation-Ball-element.png" width={756} height={448} alt="Congratulations" />
                    </div>
                    <div className={styles.lftWrap}>
                        <div className={`${styles.tleWrap} tleWrap`}>
                            <div className={styles.dElmt}>
                                <Image className={styles.elmt_1} src="/images/congratulation-sparkle.png" width={756} height={448} alt="Congratulations" />
                            </div>
                            <div className={`${styles.mTle} mTle `}>
                                {t("Congratulations")}
                            </div>
                        </div>
                        <div className={styles.imgBx}>
                            <Image src="/images/congratulation-Image.jpg" width={756} height={448} alt="Congratulations" />
                            <div className={styles.dlmt_bg_1}>
                                <Image className={styles.elmt_1} src="/images/congratulationElements.png" width={756} height={448} alt="Congratulations" />
                            </div>
                        </div>
                        <div className={styles.txt}>{t("match_congrats")}</div>
                    </div>
                    <div className={styles.rgtWrap}>
                        <div className={styles.btnWrap}>

                            <button className={"baseBtn hoveranim"} aria-label="view all button">
                                <span>YALLA !</span>
                                <span
                                    className={styles.icon}

                                >
                                    <svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.4241 41.8981C32.8564 41.8981 42.1241 32.6303 42.1241 21.1981C42.1241 9.76575 32.8564 0.498047 21.4241 0.498047C9.99183 0.498047 0.724121 9.76575 0.724121 21.1981C0.724121 32.6303 9.99183 41.8981 21.4241 41.8981Z" fill="white" />
                                        <path d="M30.5505 12.0705C28.3969 9.89535 25.5368 8.5614 22.4862 8.30927C19.4357 8.05713 16.3954 8.90341 13.9139 10.6955C11.4323 12.4875 9.67281 15.1073 8.95276 18.0824C8.23271 21.0575 8.59949 24.1919 9.98695 26.9204L8.62498 33.5326C8.61085 33.5984 8.61045 33.6665 8.62381 33.7324C8.63717 33.7984 8.66399 33.8609 8.70261 33.9161C8.75918 33.9997 8.83993 34.0641 8.93408 34.1007C9.02823 34.1373 9.1313 34.1443 9.22952 34.1207L15.71 32.5847C18.4308 33.937 21.5431 34.2802 24.4932 33.5532C27.4433 32.8262 30.0398 31.0761 31.8206 28.6144C33.6015 26.1527 34.4512 23.139 34.2187 20.1096C33.9861 17.0802 32.6863 14.2315 30.5505 12.0705ZM28.5299 28.1977C27.0398 29.6836 25.121 30.6645 23.0439 31.0021C20.9667 31.3397 18.836 31.017 16.952 30.0795L16.0488 29.6326L12.0758 30.5735L12.0875 30.5241L12.9108 26.5252L12.4686 25.6525C11.506 23.7619 11.1664 21.6152 11.4985 19.5198C11.8306 17.4244 12.8174 15.4878 14.3175 13.9876C16.2024 12.1033 18.7585 11.0448 21.4237 11.0448C24.0889 11.0448 26.645 12.1033 28.5299 13.9876C28.546 14.006 28.5633 14.0233 28.5817 14.0393C30.4432 15.9285 31.4824 18.477 31.4727 21.1292C31.463 23.7814 30.4052 26.3222 28.5299 28.1977Z" fill="#C7A27D" />
                                        <path d="M28.1787 25.2635C27.6918 26.0303 26.9226 26.9689 25.9558 27.2017C24.2622 27.611 21.6629 27.2159 18.4286 24.2002L18.3886 24.165C15.5447 21.5281 14.8061 19.3334 14.9848 17.5927C15.0836 16.6048 15.9069 15.7109 16.6009 15.1275C16.7106 15.0339 16.8407 14.9672 16.9807 14.9329C17.1208 14.8985 17.267 14.8974 17.4076 14.9296C17.5482 14.9619 17.6792 15.0265 17.7904 15.1185C17.9015 15.2104 17.9895 15.3271 18.0475 15.4592L19.0943 17.8115C19.1623 17.964 19.1875 18.1322 19.1672 18.2979C19.1469 18.4637 19.0818 18.6208 18.979 18.7524L18.4497 19.4392C18.3362 19.5811 18.2676 19.7536 18.253 19.9347C18.2383 20.1158 18.2782 20.2972 18.3674 20.4554C18.6638 20.9753 19.3742 21.7398 20.1622 22.4478C21.0466 23.2476 22.0275 23.9791 22.6485 24.2285C22.8147 24.2964 22.9974 24.3129 23.1731 24.276C23.3487 24.2391 23.5093 24.1505 23.6341 24.0215L24.2481 23.4028C24.3666 23.286 24.5139 23.2027 24.675 23.1614C24.8362 23.1201 25.0054 23.1222 25.1655 23.1676L27.6518 23.8733C27.789 23.9154 27.9147 23.9882 28.0194 24.0863C28.124 24.1845 28.2049 24.3052 28.2557 24.4393C28.3066 24.5735 28.3261 24.7175 28.3127 24.8603C28.2994 25.0032 28.2535 25.1411 28.1787 25.2635Z" fill="#C7A27D" />
                                    </svg>

                                </span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SampleCongrats;
