/** @type {import("next").NextConfig} */
const config = {
    webpack: (config) => {
        config.infrastructureLogging = {
            level: 'error'
        };

        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imperial-deck-registry.s3.us-east-2.amazonaws.com',
                pathname: '**'
            }
        ]
    },
    transpilePackages: ['three'],
    redirects() {
        return Promise.resolve([
            {
                source: '/decks',
                destination: '/decks/public',
                permanent: true
            },
            {
                source: '/tools/card-management',
                destination: '/tools/card-management/cards',
                permanent: true
            },
            {
                source: '/tools/user-management',
                destination: '/tools/user-management/roles',
                permanent: true
            }
        ]);
    }
};

export default config;
