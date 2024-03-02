/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
