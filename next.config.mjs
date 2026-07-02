/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Blog cover images (featuredImage) come from the Uplift AI CMS and may be
    // hosted on arbitrary HTTPS origins (CDN, storage bucket, etc.).
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    // The logo + portrait placeholder are first-party SVGs. Allow next/image to
    // serve them, but sandbox + forbid scripts so an SVG can never execute JS.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
