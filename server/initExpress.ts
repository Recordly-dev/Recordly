import * as express from "express";
import type { ErrorRequestHandler } from "express";
import * as morgan from "morgan";
import * as connectRedis from "connect-redis";

import * as http from "http";
import * as session from "express-session";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";

import initOAuth from "./oauth";
import routers from "./routes/index";
import { RedisClientType } from "@redis/client";
import { HttpCode } from "./constants/httpCode";
import { AppError, isTrustedError } from "./errors/AppError";

const redisStore = connectRedis(session);

export default function initExpress(redisClient: RedisClientType) {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(morgan("dev"));
  app.use(
    express.json({
      limit: "50mb",
    })
  );
  app.use(express.urlencoded({ limit: "50mb", extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new redisStore({
        port: 6379,
        client: redisClient,
        prefix: "session:",
        db: 0,
      }),

      cookie: { path: "/", maxAge: 180 * 60 * 1000 },
    })
  );

  initOAuth(app);

  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  app.use("/api/public", express.static("public"));

  app.use("/api", routers);

  const errorHandler: ErrorRequestHandler = (
    err: Error | AppError,
    request,
    response,
    next
  ) => {
    if (err instanceof AppError && isTrustedError(err)) {
      response.status(err.httpCode).json({
        message: err.message,
      });
    } else {
      response &&
        response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
          message: "Internal Server Error",
        });
    }
  };
  app.use(errorHandler);

  return http.createServer(app).listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
  });
}
