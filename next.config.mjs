import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, ".."),
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
