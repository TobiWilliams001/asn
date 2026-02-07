/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/v0/b/**'
          }
        ]
    },
    transpilePackages: ['undici'],
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    }
}

module.exports = nextConfig