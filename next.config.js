/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // FREE_COURSE_ID: "2",
    // FREE_SUB_ID: "2",
    FREE_COURSE_ID: 17,
    FREE_SUB_ID: 11,
    // customKey: "http://localhost:7700",
    customKey: "https://backend.thetopplayer.com",
    // webDomain: "http://localhost:4000",
    webDomain: "https://thetopplayer.com",
    tamraPublicKey: "a916b2ef-bb66-4e5b-84d9-5bbae98db825",
    // tamraPublicKey: "7aa51bac-f5b4-4896-991d-36fa7a0a1d66", //test
    // webDomain: "http://www.thetopplayer.com",
    googleAnalytics: "G-F4F4H6800X",
    // STRIPE_PROMISE: "pk_test_51O7Z2SBIK7a01kKzeBhiuYUF4wDVbSRIQSaaNoXDH6EesdBEDX4q68oABlFwYwmVheThQKBGENfalCW39yNhHh6f00Ge8Zrzhq", //test
    STRIPE_PROMISE:
      "pk_live_51O7Z2SBIK7a01kKz9y6brLLX1SQBrs7OMn4RFfb6GRQuE8Hv7SMSURDJLuJazosoWyLPJv8i4xrVNjwhP89nuDOb00ZDiIGV5U", //live
    tamaraPrivateKey:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiIwYmY3MDNiZi04ZTFhLTRhYzEtOWRkNi1hNDE4ODFjOTRkMGEiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiNjQ5YzcyMzY4OTFmYzZjNDVjYTczZDAzNTBlMjM5ZjYiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTcxNzY1MzgwMCwiaXNzIjoiVGFtYXJhIFBQIn0.a9tojPzHIzqvWU1qfntezLkkpRaDuQnXIDGSuhwRZp9_pbIBBqmfqzDRw5VjwbLG1L1LuKLjFjXcVn3b2_idYyQ2bR-ZgKo-J0XI7YenzporatYyEkJY6kMW9dR2d_58mMBebMWv87Mq3IHSrmqpFFlGk0UZMFMRRXr77mzoDowsVq8x4ODasbTlEw23S1uMeB7WuA5c-qJlBcEsHZ4Jdaz8q_dscjBzKu-abbdLrnF-Q39s24wHTevPcFm4fsdk5xzPXXf-LVizaibObUXn0RPCFQDMH2QIiQYhlrTR5CxfqjVd_gFldMOSTq6zutAR5UE1rPjS1AcxesCdEB7fIQ",
  },
  swcMinify: true,

  images: {
    unoptimized: true,
    minimumCacheTTL: 60,
    deviceSizes: [
      256, 320, 492, 512, 640, 768, 896, 1024, 1152, 1280, 1408, 1536, 1664,
      1792, 1920, 2048, 2176, 2304, 2432, 2560, 2688, 2944,
    ],
    imageSizes: [32, 64, 96, 112, 128, 144, 160, 176, 192, 240],
    // formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https", // Set the protocol as a string
        hostname: "crm.intersmarthosting.in", // Set the hostname as a string
        pathname: "**",
      },
      {
        protocol: "http", // Set the protocol as a string
        hostname: "localhost", // Set the hostname as a string
        pathname: "**",
      },
      {
        protocol: "https", // Set the protocol as a string
        hostname: "backend.thetopplayer.com", // Set the hostname as a string
        pathname: "**",
      },
      {
        protocol: "http", // Set the protocol as a string
        hostname: "192.168.29.154",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevent iframe embedding
          { key: "X-Frame-Options", value: "DENY" },
          // XSS filter in older browsers (optional for modern)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Force HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Control referrer info
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Enable DNS prefetching for better performance
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Restrict feature access (modify as needed)
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(self), microphone=(), camera=(), fullscreen=(self), payment=(self https://js.stripe.com https://checkout.tamara.co)",
          },

          // Basic CSP (customize for your needs)
          {
            key: "Content-Security-Policy",
            value: `
                  default-src 'self';
                  script-src 'self' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com https://cdn.tamara.co;
                  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                  font-src 'self' https://fonts.gstatic.com data:;
                  img-src 'self' data: https://backend.thetopplayer.com https://crm.thetopplayer.com http://localhost:7700 http://192.168.29.154:7700 https://purecatamphetamine.github.io;
                  connect-src 'self' https://backend.thetopplayer.com   https://purecatamphetamine.github.io https://crm.thetopplayer.com http://localhost:7700 http://192.168.29.154:7700 https://www.google-analytics.com https://ipapi.co https://api.tamara.co;
                  media-src 'self' https://backend.thetopplayer.com https://purecatamphetamine.github.io https://crm.thetopplayer.com http://localhost:7700 http://192.168.29.154:7700;
                  frame-src https://js.stripe.com https://checkout.tamara.co https://purecatamphetamine.github.io;
                  frame-ancestors 'none';
                  object-src 'none';
                  base-uri 'self';
                `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
      {
        source: "/_next/data/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, stale-while-revalidate=600",
          },
        ],
      },
      {
        source: "/.well-known/apple-developer-merchantid-domain-association",
        headers: [{ key: "content-type", value: "application/json" }],
      },
    ];
  },
};

module.exports = nextConfig;
