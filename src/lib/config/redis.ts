import { createClient } from "redis";
import env from "./env";

export const redisClient = createClient({
  password: env.REDIS_PW,
  socket: {
    host: env.REDIS_HOST,
    port: 14153,
  },
}).on("error", () => {
  console.log("redis client error connecting");
  redisClient.quit();
});

if (!redisClient.isOpen) {
  await redisClient.connect();
}
