import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const nonce = ctx.req?.headers["x-nonce"] || ""; // Access the nonce from middleware
    return { ...initialProps, nonce };
  }

  render() {
    const { nonce } = this.props;

    const csp = `
      default-src 'self';
      script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'nonce-${nonce}';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https://backend.thetopplayer.com;
      connect-src 'self' https://backend.thetopplayer.com https://www.google-analytics.com;
      media-src 'self' https://backend.thetopplayer.com;
      frame-ancestors 'none';
      object-src 'none';
      base-uri 'self';
    `
      .replace(/\s{2,}/g, " ")
      .trim();

    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// import { Html, Head, Main, NextScript } from "next/document";

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head>
//         {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&family=Readex+Pro:wght@200;300;400;500;600;700&display=swap"
//           rel="stylesheet"
//         /> */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
//         <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet" />
//       </Head>
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }
