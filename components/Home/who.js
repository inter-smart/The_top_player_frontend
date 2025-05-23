import { getCounts } from "@/store/WhoSlice";
import { current } from "@reduxjs/toolkit";
import Image from "next/legacy/image";
import { useSelectedLayoutSegments } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  FullscreenToggle,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
  VolumeMenuButton,
} from "video-react";

const Who = ({ styles, Lang }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const { counts, count, unit } = useSelector((state) => state.WhoSlice);

  const playerref = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return;
  };

  useEffect(() => {
    dispatch(getCounts());
  }, []);

  const playerOptns = {
    userActions: {
      doubleClick: false,
    },
  };

  return (
    <div className={styles.who_section} id={"about"}>
      <div className={styles.dElmt_1}>
        <Image
          src={"/images/dElmt-countBg-1.svg"}
          layout="fill"
          alt="bg"
          objectFit="contain"
          loading="lazy"
        />
      </div>
      <div className="container">
        <div className={styles.dFlx}>
          <div className={styles.w_100}>
            <div className={styles.cntWrap}>
              <div className={"tleWrap center"}>
                <h2 className={"mTle"}>
                  {Lang === "ar" ? counts[0]?.head_ar : counts[0]?.head}
                </h2>
              </div>
              <p className={styles.who_p}>
                {" "}
                {Lang === "ar" ? counts[0]?.subhead_ar : counts[0]?.subhead}
              </p>
            </div>
          </div>
          <div className={styles.lftSd}>
            <div className={styles.imgWrap} onDoubleClick={handleClick}>
              {/* <video muted autoPlay loop playsInline preload="metadata" aria-label="Video player">
                {counts[0]?.videoUrl && (
                  <source src={`${process.env.customKey}/who_we_videos/${counts[0].videoUrl}`} type="video/mp4" />
                )}
              </video> */}
              <Player
                ref={playerref}
                fluid
                playsInline={true}
                key={counts[0]?.id}
                autoPlay
                loop
                muted
              >
                <source
                  src={`${process.env.customKey}/who_we_videos/${counts[0]?.videoUrl}`}
                />
                <ControlBar>
                  <FullscreenToggle className="ToogelFull" />
                  <ReplayControl seconds={10} order={1.1} />
                  <ForwardControl seconds={10} order={1.2} />
                  <CurrentTimeDisplay order={4.1} />
                  <TimeDivider order={4.2} />
                  <PlaybackRateMenuButton
                    rates={[5, 2, 1, 0.5, 0.1]}
                    order={7.1}
                  />
                  <VolumeMenuButton disabled={false} />
                </ControlBar>
              </Player>
            </div>
          </div>
          <div className={styles.rgtSd}>
            <div className={styles.itemFlx}>
              <div className={styles.item}>
                <div className={styles.countBx}>
                  <div className={styles.dElmt_1}>
                    <Image
                      src={"/images/dElmt-countBg-1.svg"}
                      layout="fill"
                      alt="bg"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.dElmt_2}>
                    <Image
                      src={"/images/dElmt-countBg-2.png"}
                      layout="fill"
                      alt="bg"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.iconWrap}>
                    <Image
                      src={"/images/icon-exp.svg"}
                      alt="exp"
                      layout="fill"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </span>
                  <span className={styles.cntWrap}>
                    <h3 className={styles.num} style={{ direction: "ltr" }}>
                      <span
                        className={`${styles.counter} counter`}
                        data-target={"14"}
                      >
                        <CountUp
                          enableScrollSpy={true}
                          start={0}
                          end={parseInt(counts[0]?.experience) || 0}
                          key={"experience-count"}
                        />
                      </span>
                    </h3>
                    <div className={styles.txt}>{t("who.experience")}</div>
                  </span>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.countBx}>
                  <div className={styles.dElmt_1}>
                    <Image
                      src={"/images/dElmt-countBg-1.svg"}
                      layout="fill"
                      alt="bg"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.dElmt_2}>
                    <Image
                      src={"/images/dElmt-countBg-2.png"}
                      layout="fill"
                      alt="bg"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.iconWrap}>
                    <Image
                      src={"/images/icon-users.svg"}
                      alt="exp"
                      layout="fill"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </span>
                  <span className={styles.cntWrap}>
                    <h3 className={styles.num} style={{ direction: "ltr" }}>
                      <span
                        className={`${styles.counter} counter`}
                        data-target={"10"}
                      >
                        <CountUp
                          enableScrollSpy={true}
                          start={0}
                          end={parseInt(count ? count : 0) || 0}
                          key={"users-count"}
                        />
                      </span>
                      {unit ? unit : ""}+
                    </h3>
                    <div className={styles.txt}>{t("who.users")}</div>
                  </span>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.countBx}>
                  <div className={styles.dElmt_1}>
                    <Image
                      src={"/images/dElmt-countBg-1.svg"}
                      layout="fill"
                      alt="bg"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.dElmt_2}>
                    <Image
                      src={"/images/dElmt-countBg-2.png"}
                      layout="fill"
                      alt="bg"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </div>
                  <span className={styles.iconWrap}>
                    <Image
                      src={"/images/icon-courses.svg"}
                      alt="exp"
                      layout="fill"
                      objectFit="contain"
                      loading="lazy"
                    />
                  </span>
                  <span className={styles.cntWrap}>
                    <h3 className={styles.num} style={{ direction: "ltr" }}>
                      <span
                        className={`${styles.counter} counter`}
                        data-target={"10"}
                      >
                        <CountUp
                          enableScrollSpy={true}
                          start={0}
                          end={parseInt(counts[0]?.courses) || 0}
                          key={"courses-count"}
                        />
                      </span>
                      %
                    </h3>
                    <div className={styles.txt}>{t("who.courses")}</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Who;
