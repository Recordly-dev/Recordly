const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  if (!process.env.IS_DOCKER) {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:8080",
        changeOrigin: true,
      })
    );
  }
};
