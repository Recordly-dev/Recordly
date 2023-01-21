import { createClient } from "redis";

export default function initRedis() {
  const options: {
    legacyMode: boolean;
    url?: string;
    host?: string;
    port?: string;
  } = { legacyMode: true };
  if (process.env.REDIS_URL) {
    options.url = process.env.REDIS_URL;
  } else {
    options.host = "127.0.0.1";
    options.port = "6379";
  }
  const redisClient = createClient(options);
  redisClient.connect();
  redisClient.on("error", function (err) {
    console.log("Could not establish a connection with redis. " + err);
  });
  redisClient.on("connect", function (err) {
    console.log("Connected to redis successfully");
  });
  return redisClient;
}
