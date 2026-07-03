import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@playableos/blueprint-schema", "@playableos/runtime"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
  productionBrowserSourceMaps: false,
};

export default nextConfig;
