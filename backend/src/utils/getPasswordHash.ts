import crypto from "crypto";
import { env } from "../lib/env";

export const getPasswordHash = (password: string) => {
  return crypto.createHash("sha-256").update(`${env.PASSWORD_SALT}${password}`).digest("hex");
};
