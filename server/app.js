import initMongo from "./mongo.js";
import initRedis from "./redis.js";
import initExpress from "./express.js";

const main = async () => {
  await initMongo();
  const redisClient = initRedis();
  initExpress(redisClient);
};

main();
