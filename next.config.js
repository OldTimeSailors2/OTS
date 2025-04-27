/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ots-strapi.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
