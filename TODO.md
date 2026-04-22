# PlateHunt — TODO

## Stripe
- [ ] Create Stripe account, add $9/mo product, copy Price ID
- [ ] Add `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` to Vercel env vars
- [ ] Register webhook endpoint → `https://license-plate-tracker-dusky.vercel.app/api/webhooks/stripe`
- [ ] Enable 3 webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] Remove dev subscription bypass in `src/lib/subscription.ts` before go-live
- [ ] Test full flow: register → subscribe → dashboard access

## Email (Resend)
- [ ] Create Resend account, verify sending domain
- [ ] Add `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to Vercel env vars
- [ ] Improve notification email template (currently raw inline HTML in `src/worker/jobs/notify.ts`)
- [ ] Test notification triggers end-to-end

## Scraper
- [ ] Replace Playwright TX scraper with HTTP scraper hitting `myplates.com` API
- [ ] Implement Florida scraper (`services.flhsmv.gov/MVCheckWeb/`) — raw HTTP POST, no browser needed
- [ ] Verify both scrapers return real results by running manually
- [ ] Expand `generateCandidates()` in `src/worker/scrapers/us.ts` — current list is small
- [ ] Mark plates as `isAvailable: false` when they disappear from results
- [ ] Add scraper health logging (last run time, plates found, errors)
- [ ] Wire scraper results into notification fan-out and test end-to-end

## Worker Deployment (Railway)
- [ ] Create Railway project, connect GitHub repo
- [ ] Set start command to `npm run worker`
- [ ] Add all env vars (same as Vercel)
- [ ] Run `npm run db:seed` against prod Neon DB
- [ ] Verify scraper runs on 6h schedule

## Polish / Pre-launch
- [ ] Remove Google OAuth provider from auth config or add `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` env vars
- [ ] Redirect `/` → `/dashboard` for already logged-in users
- [ ] Mobile layout — sidebar needs to collapse on small screens
- [ ] Add error boundary for dashboard API failures (currently shows blank on error)
- [ ] Add `robots.txt`
- [ ] Add SEO meta tags (OpenGraph, description per page)

## Future
- [ ] Dubai (UAE) scraper — MOEI has a public plate auction site
- [ ] Germany / UK scrapers
- [ ] Community rarity voting (upvote/downvote plates)
- [ ] Web push notifications (VAPID, service worker, opt-in flow)
- [ ] Admin panel — scraper health dashboard, last-run timestamps, error rates
- [ ] Rate limiting on API routes (Upstash Redis)
- [ ] Error monitoring (Sentry)
