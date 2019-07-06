// vue.config.js

module.exports = {
    indexPath: "index.html",
    devServer: {
        proxy: {
            "/api/v1": {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            }
        }
    }
};
