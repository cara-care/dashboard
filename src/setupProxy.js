const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/**',
    createProxyMiddleware({
      target:
        process.env.REACT_APP_LOCATION === 'EU'
          ? 'https://eu-staging.cara.care'
          : 'https://global-staging.cara.care',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '',
      },
    })
  );
};
