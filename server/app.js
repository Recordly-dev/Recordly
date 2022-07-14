import redis from "redis";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import connectRedis from "connect-redis";
const redisStore = connectRedis(session);
import http from "http";

import initMongo from "./mongo.js";
import initOAuth from "./oauth.js";
import routers from "./routes/index.js";

const main = () => {
  initMongo().then(() => {
    const redisClient = initRedis();
    const server = initExpress(redisClient);
  });
};

const initRedis = () => redis.createClient();

const initExpress = (redisClient) => {
  const app = express();
  const PORT = 8080;

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(
    session({
      key: "app.sid",
      secret: "session-secret",
      store: new redisStore({
        host: "127.0.0.1",
        port: 6379,
        client: redisClient,
        prefix: "session:",
        db: 0,
      }),
      resave: false,
      saveUninitialized: true,
      cookie: { path: "/", maxAge: 1800000 },
    })
  );

  app.use("/api", routers);

  // app.get("/", (req, res, next) => {
  //   res.send("hello world!");
  // });

  return http.createServer(app).listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
  });
};

main();
