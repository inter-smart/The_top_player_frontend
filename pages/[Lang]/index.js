import Head from "next/head";
import { Suspense as ReactSuspense } from "react";
import styles from "@/styles/Home.module.css";
import stylesSass from "@/styles/Home.module.scss";
import dynamic from "next/dynamic";
import LangWrap from "@/components/layouts/LangWarp";
import axios from "axios";

// Create reusable axios instance
const apiClient = axios.create({
  baseURL: process.env.customKey,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Dynamic imports with consistent loading placeholders
const LangChange = dynamic(() => import("@/components/layouts/LangChange"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
});
const Header = dynamic(() => import("@/components/Home/Header"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
});
const Who = dynamic(() => import("@/components/Home/who"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
});
const Program = dynamic(() => import("@/components/Home/Program"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
});
const Suspense = dynamic(() => import("@/components/Home/Suspense"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
});
const News = dynamic(() => import("@/components/Home/News"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
});
const FAQs = dynamic(() => import("@/components/Home/FAQs"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Home/contact"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
});

export default function Home({ lang, mainBanner }) {
  return (
    <>
      <Head>
        <title>The Top Player</title>
        <meta
          name="description"
          content="The Top Player Yalla! Kick-start your journey to excellence with our premier football training programs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/favicon.ico" as="image" />
        <meta property="og:locale" content={lang || "en_US"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home - The Top Player" />
        <meta
          property="og:description"
          content="The Top Player Yalla! Unleash your inner champion with our premier football training programs from the Middle East."
        />
        <meta property="og:url" content="https://thetopplayer.com/" />
        <meta property="og:site_name" content="The Top Player" />
        <meta property="og:image" content="/LogoTP.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home - The Top Player" />
        <meta
          name="twitter:description"
          content="The Top Player Yalla! Unleash your inner champion with our premier football training programs."
        />
        <meta name="twitter:image" content="/LogoTP.png" />
      </Head>
      <main>
        <LangWrap Lang={lang}>
          <LangChange Lang={lang}>
            <ReactSuspense fallback={<div aria-hidden="true" />}>
              <Header styles={stylesSass} Lang={lang} state={mainBanner?.[0] || null} />
              <Who styles={stylesSass} Lang={lang} />
              <Program styles={styles} Lang={lang} />
              <Suspense styles={styles} Lang={lang} />
              <News styles={stylesSass} Lang={lang} />
              <FAQs styles={styles} Lang={lang} />
              <Contact styles={styles} Lang={lang} />
            </ReactSuspense>
          </LangChange>
        </LangWrap>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const defaultLang = "en"; // Fallback language
  const lang = (params?.Lang || defaultLang).toLowerCase();

  try {
    const response = await apiClient.get("/main_banner");
    return {
      props: {
        lang,
        mainBanner: Array.isArray(response.data?.data) ? response.data.data : null,
      },
    };
  } catch (error) {
    console.error("Error fetching main banner:", error.message);
    return {
      props: {
        lang,
        mainBanner: null,
      },
    };
  }
}

// import Head from "next/head";
// import styles from "@/styles/Home.module.css";
// import stylesSass from "@/styles/Home.module.scss";
// import dynamic from "next/dynamic";
// import LangWrap from "@/components/layouts/LangWarp";
// import axios from "axios";
// const LangChange = dynamic(() => import("@/components/layouts/LangChange"), {
//   loading: () => <></>,
//   ssr: false,
// });
// const News = dynamic(() => import("@/components/Home/News"), {
//   loading: () => <></>,
//   ssr: false,
// });
// const Program = dynamic(() => import("@/components/Home/Program"), {
//   loading: () => <></>,
//   ssr: false,
// });
// const Suspense = dynamic(() => import("@/components/Home/Suspense"), {
//   loading: () => <></>,
//   ssr: false,
// });
// const Contact = dynamic(() => import("@/components/Home/contact"), {
//   loading: () => <></>,
//   ssr: false,
// });
// const Who = dynamic(() => import("@/components/Home/who"), {
//   loading: () => <></>,
//   ssr: false,
// });
// const Header = dynamic(() => import("@/components/Home/Header"), {
//   loading: () => <></>,
//   ssr: false,
// });
// const FAQs = dynamic(() => import("@/components/Home/FAQs"), {
//   loading: () => <></>,
//   ssr: false,
// });
// export default function Home({ Lang, MainBanner }) {
//   return (
//     <>
//       <Head>
//         <title>The Top Player</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//         <meta property="og:locale" content="en_US" />
//         <meta property="og:type" content="website" />
//         <meta property="og:title" content="Home - The Top Player" />
//         <meta
//           property="og:description"
//           content="The Top Player Yalla! Where You Become The Top Player Kick-start Your Journey to Excellence: Unleash Your Inner Champion with Our Premier Football Training Programs! Who Are We ? First website that is from the Middle East region to specialise in the football training, we offer comprehensive football training covering both the fitness and technique [&hellip;]"
//         />
//         <meta property="og:url" content="https://thetopplayer.com/" />
//         <meta property="og:site_name" content="The Top Player" />
//         <meta property="og:image" content="/LogoTP.png" />
//         <meta property="og:image:type" content="image/png" />
//       </Head>
//       <main>
//         <LangWrap Lang={Lang.toLowerCase()}>
//           <LangChange Lang={Lang.toLowerCase()}>
//             <Header styles={stylesSass} className={"sdkjbhd"} Lang={Lang.toLowerCase()} state={MainBanner?.[0]} />
//             <Who styles={stylesSass} Lang={Lang.toLowerCase()} />
//             <Program styles={styles} Lang={Lang.toLowerCase()} />
//             <Suspense styles={styles} Lang={Lang.toLowerCase()} />
//             <News styles={stylesSass} Lang={Lang.toLowerCase()} />
//             <FAQs styles={styles} Lang={Lang.toLowerCase()} />
//             <Contact styles={styles} Lang={Lang.toLowerCase()} />
//           </LangChange>
//         </LangWrap>
//       </main>
//     </>
//   );
// }

// export async function getServerSideProps({ params }) {
//   const result = await axios
//     .get(`${process.env.customKey}/main_banner`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     })
//     .then((res) => res.data)
//     .catch((err) => {
//       console.log(err);
//       return null;
//     });
//   // return result;
//   return {
//     props: {
//       Lang: params.Lang,
//       MainBanner: result?.data || null,
//     },
//   };
// }
