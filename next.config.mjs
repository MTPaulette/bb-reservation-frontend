

import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    // Ajoutez d'autres variables d'environnement ici
  },
  // images: {
  //   domains: ['http://127.0.0.1:8000/api'],
  //   path: 'storage/images'
  // }
};

export default withNextIntl(nextConfig);
// C:\my_workspace\own_project\brain-booster\bb-reservation-syst\src\backend\public\images\1731691416.png