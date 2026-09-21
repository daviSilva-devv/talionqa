import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@talion/contracts", "@talion/ui"],
};

export default nextConfig;
