/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/Sliders/**",
      },
      {
        protocol: "https",
        hostname: "apiblog.galaxydev.pk",
        pathname: "/uploads/Sliders/**",
      },
      {
        protocol: "https",
        hostname: "apiblog.galaxydev.pk",
        pathname: "/uploads/article/**",
      },
    ],
  },
};

export default nextConfig;
