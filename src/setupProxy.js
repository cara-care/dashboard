const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target: 'https://staging.cara.care',
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '',
      },
    })
  );
};
