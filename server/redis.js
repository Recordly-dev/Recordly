import redis from "redis";

export default function initRedis() {
  const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
    legacyMode: true,
  });
  redisClient.connect();
  redisClient.on("error", function (err) {
    console.log("Could not establish a connection with redis. " + err);
  });
  redisClient.on("connect", function (err) {
    console.log("Connected to redis successfully");
  });
  return redisClient;
}
