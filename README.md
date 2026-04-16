# MoonFade

MoonFade is a Telegram bot built with `Node.js` and `Telegraf`.
It shows a lunar haircut calendar and helps users see whether a day is good or bad for a haircut.

## Features

- Beautiful Telegram keyboard and formatted answers
- Daily lunar haircut forecast
- Full month calendar parsing from Astrosfera
- Local `polling` mode for development
- `webhook` mode for deployment on Koyeb

## Local launch

1. Create `.env` from `.env.example`
2. Set `BOT_TOKEN`
3. Keep `BOT_MODE=polling`
4. Run:

```powershell
npm install
npm run dev
```

## Koyeb launch

Use these environment variables in Koyeb:

```env
NODE_ENV=production
BOT_MODE=webhook
BOT_TOKEN=your_token
BOT_NAME=MoonFade
DB_CLIENT=memory
PORT=8000
WEBHOOK_DOMAIN=https://your-app.koyeb.app
WEBHOOK_PATH=/telegram/webhook
WEBHOOK_SECRET=your_random_secret
```

Start command:

```bash
npm start
```

## GitHub

The `.env` file is ignored by git, so secrets stay local.
