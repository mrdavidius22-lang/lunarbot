const http = require("http");
const {
  PORT,
  WEBHOOK_DOMAIN,
  WEBHOOK_PATH,
  WEBHOOK_SECRET
} = require("./config/env");
const { logger } = require("./utils/logger");

async function startWebhookServer(bot) {
  if (!WEBHOOK_DOMAIN) {
    throw new Error("WEBHOOK_DOMAIN is required when BOT_MODE is set to webhook");
  }

  const webhookHandler = await bot.createWebhook({
    domain: WEBHOOK_DOMAIN,
    path: WEBHOOK_PATH,
    secretToken: WEBHOOK_SECRET || undefined
  });

  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (req.method === "GET" && requestUrl.pathname === "/") {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({
          ok: true,
          service: "MoonFade",
          mode: "webhook"
        })
      );
      return;
    }

    if (req.method === "GET" && requestUrl.pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ status: "healthy" }));
      return;
    }

    webhookHandler(req, res);
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, "0.0.0.0", resolve);
  });

  logger.info(`Webhook server started on port ${PORT}`);
  logger.info(`Webhook URL: ${WEBHOOK_DOMAIN}${WEBHOOK_PATH}`);

  return server;
}

module.exports = {
  startWebhookServer
};
