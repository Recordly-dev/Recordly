import dotenv from "dotenv";
import path from "path";

import initMongo from "./mongo.js";
import initRedis from "./redis.js";
import initExpress from "./express.js";

const main = async () => {
  dotenv.config({
    path: path.join(path.resolve(), `/.env.${process.env.NODE_ENV}`),
  });
  await initMongo();
  const redisClient = initRedis();
  initExpress(redisClient);
};

main();
