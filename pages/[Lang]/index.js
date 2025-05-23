import Head from "next/head";
import { Suspense as ReactSuspense } from "react";
import styles from "@/styles/Home.module.css";
import stylesSass from "@/styles/Home.module.scss";
import dynamic from "next/dynamic";
import LangWrap from "@/components/layouts/LangWarp";
import axios from "axios";

// Lightweight sanitization function
const sanitizeString = (str) =>
  str?.replace(/[&<>"'\/]/g, (char) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;"
    }[char])
  ) || "";

// Dynamic imports with specific chunk names and minimal SSR
const LangChange = dynamic(() => import("@/components/layouts/LangChange"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
  webpack: (config) => {
    config.output.chunkFilename = "static/chunks/langChange.[id].js";
    return config;
  },
});
const Header = dynamic(() => import("@/components/Home/Header"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
  webpack: (config) => {
    config.output.chunkFilename = "static/chunks/header.[id].js";
    return config;
  },
});
const Who = dynamic(() => import("@/components/Home/who"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
  webpack: (config) => {
    config.output.chunkFilename = "static/chunks/who.[id].js";
    return config;
  },
});
const Program = dynamic(() => import("@/components/Home/Program"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
  webpack: (config) => {
    config.output.chunkFilename = "static/chunks/program.[id].js";
    return config;
  },
});
const Suspense = dynamic(() => import("@/components/Home/Suspense"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
  webpack: (config) => {
    config.output.chunkFilename = "static/chunks/suspense.[id].js";
    return config;
  },
});
const News = dynamic(() => import("@/components/Home/News"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
  webpack: (config) => {
    config.output.chunkFilename = "static/chunks/news.[id].js";
    return config;
  },
});
const FAQs = dynamic(() => import("@/components/Home/FAQs"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
  webpack: (config) => {
    config.output.chunkFilename = "static/chunks/faqs.[id].js";
    return config;
  },
});
const Contact = dynamic(() => import("@/components/Home/contact"), {
  loading: () => <div aria-hidden="true" />,
  ssr: false,
  webpack: (config) => {
    config.output.chunkFilename = "static/chunks/contact.[id].js";
    return config;
  },
});

export default function Home({ Lang, MainBanner }) {
  // Validate and sanitize props
  const safeLang = typeof Lang === "string" && Lang.length <= 5 ? Lang.toLowerCase() : "en";

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
        <meta property="og:locale" content={safeLang} />
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
        <LangWrap Lang={safeLang}>
          <LangChange Lang={safeLang}>
            <ReactSuspense fallback={<div aria-hidden="true" />}>
              <Header styles={stylesSass} Lang={safeLang} state={MainBanner[0]} />
              <Who styles={stylesSass} Lang={safeLang} />
              <Program styles={styles} Lang={safeLang} />
              <Suspense styles={styles} Lang={safeLang} />
              <News styles={stylesSass} Lang={safeLang} />
              <FAQs styles={styles} Lang={safeLang} />
              <Contact styles={styles} Lang={safeLang} />
            </ReactSuspense>
          </LangChange>
        </LangWrap>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const result = await axios
    .get(`${process.env.customKey}/main_banner`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching main banner:", { endpoint: "/main_banner", message: err.message });
      return null;
    });

  return {
    props: {
      Lang: params.Lang,
      MainBanner: result?.data || null,
    },
  };
}


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
