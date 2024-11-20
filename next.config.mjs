

import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    // Ajoutez d'autres variables d'environnement ici
  },
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
      },
    ],
  },
};
export default withNextIntl(nextConfig);