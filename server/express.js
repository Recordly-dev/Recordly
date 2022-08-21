import express from "express";
import morgan from "morgan";
import connectRedis from "connect-redis";
const redisStore = connectRedis(session);
import http from "http";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";

import initOAuth from "./oauth.js";
import routers from "./routes/index.js";

export default function initExpress(redisClient) {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      key: "app.sid",
      secret: process.env.COOKIE_SECRET,
      store: new redisStore({
        port: 6379,
        client: redisClient,
        prefix: "session:",
        db: 0,
      }),

      cookie: { path: "/", maxAge: 1800000 },
    })
  );

  initOAuth(app);

  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  app.use("/api", routers);

  app.use((err, req, res, next) => {
    console.log(err.message);
    res
      .status(err.status || 500)
      .json({ error: err.code, description: err.message });
  });

  return http.createServer(app).listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
  });
}
