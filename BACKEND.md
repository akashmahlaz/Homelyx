# Homelyx Backend

Phase 1 backend foundation: Postgres (Neon) + Drizzle ORM + Twilio Verify OTP + Razorpay payments, all served from Next.js Route Handlers.

## Stack

| Layer | Choice |
|---|---|
| DB | Postgres on Neon (serverless driver) |
| ORM | Drizzle ORM |
| API | Next.js 15 Route Handlers (`app/api/*`) |
| Auth | Phone OTP via Twilio Verify + JWT in httpOnly cookie (jose) |
| Payments | Razorpay (orders + checkout signature + webhook) |
| Validation | zod |

## Setup

1. Copy env: `cp .env.example .env.local` and fill in:
   - `DATABASE_URL` from Neon
   - `AUTH_SECRET` (`openssl rand -base64 48`)
   - `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_VERIFY_SID` (create a Verify Service in Twilio console)
   - `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` / `RAZORPAY_WEBHOOK_SECRET` / `NEXT_PUBLIC_RAZORPAY_KEY_ID`

2. Push schema to Neon:
   ```powershell
   bun run db:push
   ```
   Or for migration files: `bun run db:generate` then `bun run db:migrate`.

3. Inspect data:
   ```powershell
   bun run db:studio
   ```

4. Razorpay webhook URL (set in Razorpay dashboard):
   `https://yourdomain/api/payments/razorpay/webhook` — events: `payment.captured`, `payment.authorized`, `payment.failed`.

## Schema (lib/db/schema.ts)

Tables: `users`, `addresses`, `vendors`, `products`, `slots`, `slot_products`, `orders`, `order_items`, `payments`, `reviews`, `favorites`, `otp_challenges`.

All money is stored as **integer paise**. Phone numbers are stored E.164 (`+91XXXXXXXXXX`).

## API surface

### Auth
| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/api/auth/otp/send` | `{ phone }` | Sends OTP via Twilio Verify; rate-limited |
| POST | `/api/auth/otp/verify` | `{ phone, code }` | Verifies OTP, upserts user, sets session cookie |
| POST | `/api/auth/logout` | - | Clears session |
| GET | `/api/auth/me` | - | Returns current user or `null` |

### Catalog
| Method | Path | Query | Notes |
|---|---|---|---|
| GET | `/api/products` | `city`, `vendor`, `q`, `limit`, `offset` | Active products with vendor join |
| GET | `/api/vendors` | `city`, `q`, `limit` | Approved vendors |
| GET | `/api/vendors/[handle]` | - | Vendor + their products |

### Orders + Payments (auth required)
| Method | Path | Body | Notes |
|---|---|---|---|
| POST | `/api/orders` | `{ vendorId, slotId, addressId, items, notes? }` | Creates order, reserves slot, creates Razorpay order. Returns `razorpay.{ orderId, amount, currency, keyId }` for client checkout.js |
| GET | `/api/orders` | - | Current user's orders |
| POST | `/api/payments/razorpay/verify` | `{ razorpayOrderId, razorpayPaymentId, razorpaySignature }` | Verifies checkout signature, marks payment captured + order placed |
| POST | `/api/payments/razorpay/webhook` | Razorpay webhook | Verifies `X-Razorpay-Signature`, updates payment + order status |

## Frontend wiring done

- [`app/auth/login/page.tsx`](app/auth/login/page.tsx) sends real OTP via `/api/auth/otp/*` and redirects on success.

## What's still TODO (post-foundation)

- Vendor onboarding flow + admin approval queue
- Slot generation cron / vendor weekly schedule UI
- Cart persistence (currently client-only) → `carts` table, sync on login
- Address CRUD (`/api/addresses`)
- Order detail + status timeline endpoint
- Reviews POST endpoint with order verification
- File uploads (Cloudinary signed URLs) for product/kitchen photos
- WhatsApp/SMS order notifications
- Admin dashboard (`/admin`) for moderation
- Replace `lib/shopify/*` calls in current pages with new `/api/*` data
