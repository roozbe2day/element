/** @type {import('next').NextConfig} */

// The preview proxy serves the sandbox app through a different public origin than
// the dev server sees. Next gates dev assets / HMR by Origin, so when running inside
// the Base44 sandbox we whitelist that origin. Unset / any other value => no change.
const previewOrigin =
  process.env.BASE44_PREVIEW_MODE === '1' && process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`]
    : [];

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  allowedDevOrigins: previewOrigin,
};

export default nextConfig;
