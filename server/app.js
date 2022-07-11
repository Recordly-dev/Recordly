const redis = require("redis");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const redisStore = require("connect-redis")(session);

const { initMongo } = require("./mongo");
const { initOAuth } = require("./oauth");

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

  app.use("/api", require("./routes"));

  // app.get("/", (req, res, next) => {
  //   res.send("hello world!");
  // });

  return require("http")
    .createServer(app)
    .listen(PORT, () => {
      console.log("Express server listening on port " + PORT);
    });
};

main();
