/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'emothrive.net',
        pathname: '/media/**',
      }
    ],
  },
};

export default nextConfig;
