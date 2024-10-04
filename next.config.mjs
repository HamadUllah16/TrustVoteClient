/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: "res.cloudinary.com",
                port: '',
                pathname: '/**'
            }
        ]
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;

        return config;
    },
};

export default nextConfig;
