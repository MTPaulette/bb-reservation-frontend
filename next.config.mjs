

import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    // Ajoutez d'autres variables d'environnement ici
  },
};

export default withNextIntl(nextConfig);