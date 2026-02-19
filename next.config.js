/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/v0/b/**'
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',  
            port: '',
            pathname: '/**'
          },
          {
            protocol: 'https',
            hostname: '**.googleusercontent.com', 
            port: '',
            pathname: '/**'
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