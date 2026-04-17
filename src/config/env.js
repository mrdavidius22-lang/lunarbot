const dotenv = require("dotenv");

dotenv.config();

const requiredEnvVars = ["BOT_TOKEN"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  BOT_TOKEN: process.env.BOT_TOKEN,
  BOT_NAME: process.env.BOT_NAME || "MoonFade",
  BOT_ADMIN_ID: process.env.BOT_ADMIN_ID || "",
  DB_CLIENT: process.env.DB_CLIENT || "memory",
  DB_URI: process.env.DB_URI || ""
};
