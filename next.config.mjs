/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted for free on Cloudflare Pages.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
