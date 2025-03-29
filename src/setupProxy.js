// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/polarion/rest',
    createProxyMiddleware({
      target: 'http://ec2amaz-fk4qupb', // The domain of your Polarion server
      changeOrigin: true,
      // You can add onProxyReq or onProxyRes here to manipulate headers if needed
    })
  );
};
