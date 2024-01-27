import crypto from "crypto";
import env from "../config/env";

export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(env.ENCRYPT_KEY),
    Buffer.from(env.ENCRYPT_IV)
  );
  var crypted = cipher.update(text.toString(), "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

const decrypt = (text: string) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(env.ENCRYPT_KEY),
    Buffer.from(env.ENCRYPT_IV)
  );
  let dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
};
