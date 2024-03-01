// import { createClient } from "redis";
import Redis from "ioredis";
import env from "./env";

export const redisClient = new Redis({
  host: env.REDIS_HOST,
  password: env.REDIS_PW,
  port: 10480,
});

// if (!redisClient.isOpen) {
// await redisClient.connect();
// }
