import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    IMAGE_SRC: process.env.IMAGE_SRC,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      /*
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },*/
      {
        protocol: "https",
        hostname: "reservation.bbdesign.dev",
        port: "",
        pathname: "/**",
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
export default withNextIntl(nextConfig);
