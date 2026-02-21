import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/wsrvLoader.ts",
  },
};

export default nextConfig;
