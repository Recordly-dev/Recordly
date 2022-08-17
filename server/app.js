import dotenv from "dotenv";

import initMongo from "./mongo.js";
import initRedis from "./redis.js";
import initExpress from "./express.js";

const main = async () => {
  dotenv.config();
  await initMongo();
  const redisClient = initRedis();
  initExpress(redisClient);
};

main();
