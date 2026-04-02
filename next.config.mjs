/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", pathname: "/**" },
      { protocol: "https", hostname: "travel-tailer-cms.onrender.com", pathname: "/**" },
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
      { protocol: "https", hostname: "traveltailorapi.webitof.com", pathname: "/**" },
      { protocol: "https", hostname: "traveltailor.webitof.com", pathname: "/**" },
      { protocol: "https", hostname: "traveltailoradmin.webitof.com", pathname: "/**" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
