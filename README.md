# MoonFade

MoonFade is a Telegram bot built with `Node.js` and `Telegraf`.
It shows a lunar haircut calendar and helps users see whether a day is good or bad for a haircut.

## Features

- Beautiful Telegram keyboard and formatted answers
- Daily lunar haircut forecast
- Full month calendar parsing from Astrosfera
- Multilanguage interface: Russian and English
- Simple deployment on a VPS with `polling`

## Local launch

1. Create `.env` from `.env.example`
2. Set `BOT_TOKEN`
3. Run:

```powershell
npm install
npm run dev
```

## VPS deployment

This project is prepared for a regular Linux VPS such as Hetzner Cloud.
The recommended deployment mode is `polling`, because it is simpler than webhooks and does not require HTTPS, domains, or reverse proxies.

Recommended stack:

- Ubuntu 22.04 or 24.04
- Node.js 22
- `pm2` for process management
- `git` for updates

Minimal `.env` for production:

```env
NODE_ENV=production
BOT_TOKEN=your_token
BOT_NAME=MoonFade 
BOT_ADMIN_ID=
DB_CLIENT=memory
DB_URI=
```

Install and run:

```bash
git clone <your_repo_url>
cd lunarbot
npm install
npm install -g pm2
npm start
# or
pm2 start src/bot.js --name moonfade
pm2 save
```

## Hetzner plan

A good starting option is a small Hetzner Cloud VPS.
For this bot, a low-cost shared CPU instance is enough.

## GitHub

The `.env` file is ignored by git, so secrets stay local.
