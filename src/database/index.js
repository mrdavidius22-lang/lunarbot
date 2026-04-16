const { DB_CLIENT, DB_URI } = require("../config/env");
const { logger } = require("../utils/logger");

async function connectDatabase() {
  if (DB_CLIENT === "memory") {
    logger.info("Database client: memory");
    return;
  }

  if (!DB_URI) {
    throw new Error(`DB_URI is required when DB_CLIENT is "${DB_CLIENT}"`);
  }

  logger.info(`Database client "${DB_CLIENT}" is configured`);
  logger.info("Database connection placeholder is ready for implementation");
}

module.exports = {
  connectDatabase
};
