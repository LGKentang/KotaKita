/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'http', hostname: '127.0.0.1' },
      { protocol: 'https', hostname: 'banner2.cleanpng.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'kotakita-budsase2cdgzabct.eastasia-01.azurewebsites.net' },
      { protocol: 'https', hostname: 'kotakita-v2-cwfthkfudedfbkhe.eastasia-01.azurewebsites.net' },
    ],
  },
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
