const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  app.use(
    "/api",
    (req, res, next) => {
      next();
    },
    createProxyMiddleware({
      target: "http://localhost:8080", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
