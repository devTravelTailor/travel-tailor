/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Or 'https' if your localhost uses HTTPS
        hostname: "localhost",
        port: "1337", // Or the port your local server runs on (if not 3000)
        pathname: "/**", // Allows any path from this hostname
      },
    ],
    domains: [
      "localhost",
      "127.0.0.1",
      "https://travel-tailer-cms.onrender.com",
      "travel-tailer-cms.onrender.com",
      "storage.googleapis.com",
      "traveltailorapi.webitof.com",
      "traveltailor.webitof.com",
      "traveltailoradmin.webitof.com",
      "https://traveltailorapi.webitof.com",
      "https://traveltailor.webitof.com",
      "https://traveltailoradmin.webitof.com",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
