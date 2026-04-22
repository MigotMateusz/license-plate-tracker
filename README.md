# PlateHunt

License plate availability tracker. Monitors US DMV systems and notifies subscribers when rare or custom plates become available.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Prisma** + **Neon** (PostgreSQL)
- **NextAuth v5** (credentials + Google OAuth)
- **Stripe** (subscriptions, billing portal)
- **BullMQ** + **Upstash Redis** (scrape/notify job queues)
- **Resend** (transactional email)
- **Playwright** (DMV scraping)

## Local Setup

1. Copy `.env.example` to `.env.local` and fill in values:
   ```bash
   cp .env.example .env.local
   ```

2. Push the database schema:
   ```bash
   npm run db:push
   ```

3. Seed sample plate data:
   ```bash
   npm run db:seed
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. (Optional) Run the background worker:
   ```bash
   npm run worker
   ```

## Deployment

- **Next.js app** → Vercel (connect GitHub repo, add env vars)
- **Worker** → Railway (`npm run worker` as start command)
- **Database** → Neon (free tier, paste `DATABASE_URL` from Neon dashboard)
- **Redis** → Upstash (free tier, paste `REDIS_URL` from Upstash dashboard)

## Stripe Setup

1. Create a product in Stripe dashboard: $9/month subscription
2. Copy the Price ID to `STRIPE_PRICE_ID`
3. Set up webhook endpoint pointing to `/api/webhooks/stripe`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`
5. Enable events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | App URL (`http://localhost:3000` locally) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_PRICE_ID` | Monthly subscription price ID |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `RESEND_API_KEY` | Resend API key for email |
| `RESEND_FROM_EMAIL` | From address for notifications |
| `REDIS_URL` | Upstash Redis URL |
| `NEXT_PUBLIC_APP_URL` | Public app URL |
