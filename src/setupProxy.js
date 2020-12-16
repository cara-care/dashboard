const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target: 'https://staging.cara.care',
      ws: process.env.NODE_ENV === 'production',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '',
      },
    })
  );
};
