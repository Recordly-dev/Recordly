import * as dotenv from "dotenv";
import * as path from "path";

import initMongo from "./initMongo";
import initRedis from "./initRedis";
import initExpress from "./initExpress";

const main = async () => {
  dotenv.config({
    path: path.join(path.resolve(), `/.env.${process.env.NODE_ENV}`),
  });
  await initMongo();
  const redisClient = initRedis();
  initExpress(redisClient);
};

main();
