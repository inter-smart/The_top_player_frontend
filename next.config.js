/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FREE_COURSE_ID: "2",
    FREE_SUB_ID: "2",
    customKey: "https://backend.thetopplayer.com",
    webDomain: "https://www.thetopplayer.com",
    // webDomain: "http://localhost:4000",
    tamraPublicKey: "a916b2ef-bb66-4e5b-84d9-5bbae98db825",
    googleAnalytics: "G-F4F4H6800X",
    tamraPublicKey: "a916b2ef-bb66-4e5b-84d9-5bbae98db825",
    // tamraPublicKey: "7aa51bac-f5b4-4896-991d-36fa7a0a1d66",//test
    googleAnalytics: "G-F4F4H6800X",
    // STRIPE_PROMISE: "pk_test_51O7Z2SBIK7a01kKzeBhiuYUF4wDVbSRIQSaaNoXDH6EesdBEDX4q68oABlFwYwmVheThQKBGENfalCW39yNhHh6f00Ge8Zrzhq", //test
    STRIPE_PROMISE: "pk_live_51O7Z2SBIK7a01kKz9y6brLLX1SQBrs7OMn4RFfb6GRQuE8Hv7SMSURDJLuJazosoWyLPJv8i4xrVNjwhP89nuDOb00ZDiIGV5U", //live
    tamaraPrivateKey:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiI0ZmUxNDU1MC1jZTUzLTRhNmYtYWIyMi05MDkxOThkNmUxNmEiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiODcxZjY3OGM0MjAwYzg4YWQxZTM0YTIxMTExN2IyYjYiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTcxNzY1OTc3NCwiaXNzIjoiVGFtYXJhIn0.xDxkOqZsPt65OGuy0rDfrrjKL6hWLP2EL4ynnxQynK5lr6kMQn2dUlvLACIZc1Bx4wo5vlCcqn5L4h1zQWkFTZXDkVjaiuRh6lyLZmVkGi6KfCdZLjMmve6n3tQhuJT6c4BYcS_7Y1BS4HMCOPpwPu5ZiaYNlGYVmrhM2rdtIq9gd3yWD_8oAFO9qoF0CmdA48LNHVoAXutxR-kNlVk62MQfOD4rf2yxNuzvSj9xywiaXGrleoayEJxF9uw3ANYNVE1fGBjR_uL_dR5EJI6p16oa5NBdZtX29Tn05bx4dsjH_13xSq58hGVpEHIRjZF8NLcwSxvdBeK1zuu7DDU1CA",
  },
  swcMinify: true,
  output: "standalone", // Smaller production builds
  experimental: {
    optimizePackageImports: ["react-icons", "axios", "js-cookie"], // Tree-shake heavy packages
    nextCache: true, // Enable data cache for getServerSideProps
  },
  images: {
    minimumCacheTTL: 604800, // 1 week cache for images
    formats: ["image/avif", "image/webp"], // Modern formats
    deviceSizes: [320, 640, 768, 1024, 1280, 1920], // Simplified sizes
    imageSizes: [64, 128, 192], // Reduced for faster generation
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.thetopplayer.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "crm.intersmarthosting.in",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
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
  async headers() {
    return [
      {
        source: "/_next/data/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, stale-while-revalidate=600", // Cache data for 5min, revalidate for 10min
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        source: "/.well-known/apple-developer-merchantid-domain-association",
        headers: [{ key: "content-type", value: "application/json" }],
      },
    ];
  },
  // Enable compression for faster responses
  compress: true,
};

module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: {
//     FREE_COURSE_ID: "2",
//     FREE_SUB_ID: "2",
//     // FREE_COURSE_ID: 17,
//     // FREE_SUB_ID: 11,
//     // customKey: "http://localhost:7700",
//     customKey: "https://backend.thetopplayer.com",
//     // customKey: "https://backend.thetopplayer.com/staging",
//     // webDomain: "https://www.thetopplayer.com",
//     webDomain: "http://localhost:4000",
//     tamraPublicKey: "a916b2ef-bb66-4e5b-84d9-5bbae98db825",
//     // tamraPublicKey: "7aa51bac-f5b4-4896-991d-36fa7a0a1d66",//test
//     googleAnalytics: "G-F4F4H6800X",
//     // STRIPE_PROMISE: "pk_test_51O7Z2SBIK7a01kKzeBhiuYUF4wDVbSRIQSaaNoXDH6EesdBEDX4q68oABlFwYwmVheThQKBGENfalCW39yNhHh6f00Ge8Zrzhq", //test
//     STRIPE_PROMISE: "pk_live_51O7Z2SBIK7a01kKz9y6brLLX1SQBrs7OMn4RFfb6GRQuE8Hv7SMSURDJLuJazosoWyLPJv8i4xrVNjwhP89nuDOb00ZDiIGV5U", //live
//     tamaraPrivateKey:
//       "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiI0ZmUxNDU1MC1jZTUzLTRhNmYtYWIyMi05MDkxOThkNmUxNmEiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiODcxZjY3OGM0MjAwYzg4YWQxZTM0YTIxMTExN2IyYjYiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTcxNzY1OTc3NCwiaXNzIjoiVGFtYXJhIn0.xDxkOqZsPt65OGuy0rDfrrjKL6hWLP2EL4ynnxQynK5lr6kMQn2dUlvLACIZc1Bx4wo5vlCcqn5L4h1zQWkFTZXDkVjaiuRh6lyLZmVkGi6KfCdZLjMmve6n3tQhuJT6c4BYcS_7Y1BS4HMCOPpwPu5ZiaYNlGYVmrhM2rdtIq9gd3yWD_8oAFO9qoF0CmdA48LNHVoAXutxR-kNlVk62MQfOD4rf2yxNuzvSj9xywiaXGrleoayEJxF9uw3ANYNVE1fGBjR_uL_dR5EJI6p16oa5NBdZtX29Tn05bx4dsjH_13xSq58hGVpEHIRjZF8NLcwSxvdBeK1zuu7DDU1CA",
//   },
//   swcMinify: true,

//   images: {
//     minimumCacheTTL: 60,
//     deviceSizes: [
//       256, 320, 492, 512, 640, 768, 896, 1024, 1152, 1280, 1408, 1536, 1664, 1792, 1920, 2048, 2176, 2304, 2432, 2560,
//       2688, 2944,
//     ],
//     imageSizes: [32, 64, 96, 112, 128, 144, 160, 176, 192, 240],
//     // formats: ["image/webp"],
//     remotePatterns: [
//       {
//         protocol: "https", // Set the protocol as a string
//         hostname: "crm.intersmarthosting.in", // Set the hostname as a string
//         pathname: "**",
//       },
//       {
//         protocol: "http", // Set the protocol as a string
//         hostname: "localhost", // Set the hostname as a string
//         pathname: "**",
//       },
//       {
//         protocol: "https", // Set the protocol as a string
//         hostname: "backend.thetopplayer.com", // Set the hostname as a string
//         pathname: "**",
//       },
//       {
//         protocol: "http", // Set the protocol as a string
//         hostname: "192.168.29.154",
//         pathname: "**",
//       },
//     ],
//   },
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/en",
//         permanent: true,
//       },
//     ];
//   },
//   reactStrictMode: false,
//   async headers() {
//   return [
//     {
//       source: "/.well-known/apple-developer-merchantid-domain-association",
//       headers: [{ key: "content-type", value: "application/json" }]
//     }
//   ];
// }
// };

// module.exports = nextConfig;
