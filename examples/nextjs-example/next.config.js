/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // 정적 파일 최적화
    images: {
        unoptimized: true,
    },
    // 개발 서버 설정
    // outputFileTracingRoot: __dirname, // Next.js 14에서 제거됨
    // 정적 파일 서빙 설정
    async rewrites() {
        return [
            {
                source: '/idev-app/',
                destination: '/idev-app/index.html',
            },
            {
                source: '/idev-app/:path*',
                destination: '/idev-app/:path*',
            },
            {
                source: '/test-template.json',
                destination: '/test-template.json',
            },
        ];
    },
    // CORS 헤더 설정
    async headers() {
        return [
            {
                source: '/idev-app/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, DELETE, OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Authorization',
                    },
                ],
            },
        ];
    },
    // 정적 파일 서빙 설정
    trailingSlash: true,
    // 개발 서버 설정
    // devServer: { // Next.js 14에서 제거됨
    //     port: 3000,
    // },
};

module.exports = nextConfig;
