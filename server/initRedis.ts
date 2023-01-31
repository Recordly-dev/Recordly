import { RedisClientType, RedisClientOptions } from "@redis/client";
import { createClient } from "redis";

export default function initRedis(): RedisClientType<any, any, any> {
  const options: RedisClientOptions = { legacyMode: true };
  if (process.env.REDIS_URL) {
    options.url = process.env.REDIS_URL;
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
