/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],

    // Quality values used by <Image quality={...}> across the app;
    // explicit config is required starting in Next.js 16
    qualities: [50, 75, 85, 100],

    // ✅ Esto va aquí (global), NO dentro de remotePatterns
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "ots-strapi.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },

      // YouTube thumbnails
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
