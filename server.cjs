const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://api.3commas.io',
  changeOrigin: true,
}));

app.listen(3001, () => {
  console.log('Proxy server is running on port 3001');
});