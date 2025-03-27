import "primereact/resources/themes/lara-light-indigo/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "swiper/css/pagination";
import "swiper/css";
import "react-phone-number-input/style.css";
import { useEffect, useState } from "react";
import SocialMedia from "@/components/layouts/SocialMedia";
import Head from "next/head";
import Router from "next/router";
import { Provider } from "react-redux";
import "@/components/Data/i18n";
import store from "@/store/store";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

import "video-react/dist/video-react.css"; // import css

import "@/styles/globals.css";
import Loading from "@/components/layouts/Loading";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary/eb";
import axios from "axios";
const Navbar = dynamic(() => import("@/components/layouts/Navbar"), {
  loading: () => <Loading />,
  ssr: false,
});
const Footer = dynamic(() => import("@/components/layouts/Footer"), {
  loading: () => <></>,
  ssr: false,
});

function App({ Component, pageProps, canonical, Path }) {
  const handleKeyPress = (event) => {
    if (
      (event.ctrlKey && event.key.toLowerCase() === "u") ||
      (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === "i") ||
      (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === "c") ||
      (event.keyCode === 13 && event.key.toLowerCase() === "meta") ||
      (event.key.toLowerCase() === "meta" && event.keyCode === 71) ||
      event.keyCode === 13 ||
      event.keyCode === 91 ||
      event.keyCode === 44
    ) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.customKey}/visited`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Process the data as needed
        // //console.log("Visited data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener(`contextmenu`, (e) => e.preventDefault());
  }, []);
  const [bodyHeight, setBodyHeight] = useState(false);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = (url) => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {/* <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.googleAnalytics}`}
      />

      <Script strategy="lazyOnload" id="2">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.googleAnalytics}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script> */}

      <GoogleTagManager gtmId={process.env.googleAnalytics} />

      <Head>
        <title>The Top Player</title>
        {/* <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" /> */}

        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
        {/* 
        <link rel="apple-touch-icon" sizes="180x180" href="/fav-512.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/fav-512.jpg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/fav-512.jpg" /> */}

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <link rel="manifest" href="/manifest.json" />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      {/* <ErrorBoundary> */}
      <Provider store={store}>
        {loading && <Loading />}

        <div
          className={`${bodyHeight && "overHeight"}`}
          style={{
            overflow: "hidden",
            position: "relative",
          }}
          onContextMenu={(e) => e.preventDefault()}
          onKeyDown={handleKeyPress}
          onKeyUp={(e) => {
            if (e.keyCode == 44) {
              e.preventDefault();
              alert("Not allow to take screen schoot");
            } else {
              e.preventDefault();
            }
          }}
          onKeyUpCapture={(e) => e.preventDefault()}
          onKeyPress={(e) => {
            if (e.keyCode == 44) {
              e.preventDefault();
              alert("Not allow to take screen schoot");
            }
          }}
          tabIndex={0}
        >
          <Navbar state={bodyHeight} overHeight={(e) => setBodyHeight(e)} />
          <Component {...pageProps} />
          <Footer />
          <SocialMedia to={Path} />
        </div>
      </Provider>
      {/* </ErrorBoundary> */}
    </>
  );
}

App.getInitialProps = async ({ ctx }) => {
  const { asPath } = ctx;
  const base = "https://thetopplayer.com/";
  const canonical = base + asPath;
  return {
    Path: asPath,
    canonical,
  };
};
export default App;
