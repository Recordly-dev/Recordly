"use strict";

module.exports = {
  apps: [
    {
      name: "server-recordly",
      script: "./app.js",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
