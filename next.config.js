/** @type {import("next").NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")(
  {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
    maximumFileSizeToCacheInBytes: 100000000
  }
);
module.exports = withPWA({
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  trailingSlash: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "ko"],
    defaultLocale: "ko"
  },
  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/auth/wallet",
        permanent: true
      },
      {
        source: "/mail",
        destination: "/mail/inbox",
        permanent: true
      }
    ];
  }
});
