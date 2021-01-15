const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target: 'https://staging.cara.care',
      // ws: true, // <-- broken tests but needed for chat development
      ws: process.env.NODE_ENV === 'production',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '',
      },
    })
  );
};
