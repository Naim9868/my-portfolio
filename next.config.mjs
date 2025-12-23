/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        port: '',       // leave empty unless needed
        pathname: '/**' // allow all paths
      },
    ],
  },
};

export default nextConfig;
