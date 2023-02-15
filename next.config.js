const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    rewrites: async () => {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL}/api/:path*`,
            },

        ]
    },

});
