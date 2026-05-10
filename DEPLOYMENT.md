# Deployment Checklist

## 1. Local Setup

Install Node.js LTS from:

```txt
https://nodejs.org
```

Then run:

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## 2. Brand Content To Replace

- Final logo
- Product photos
- Retail prices
- Wholesale prices
- Contact email
- Business phone
- Domain name
- Final story copy

## 3. GitHub

Create a GitHub repository named:

```txt
laniakea-alta-reserve-coffee
```

Then push this project to that repository.

## 4. Vercel

In Vercel:

1. Import the GitHub repository.
2. Framework should be detected as Next.js.
3. Add environment variables from `.env.example` if needed.
4. Deploy.

## 5. Stripe

Checkout now creates a Stripe Checkout Session. When ready for real payments:

1. Create a Stripe account.
2. Add `STRIPE_SECRET_KEY` to Vercel environment variables.
3. Add `NEXT_PUBLIC_APP_URL` with the production domain.
4. Keep test mode until products, shipping, tax, and fulfillment are verified.

## 6. Recommended Launch Order

1. Replace product photos and prices.
2. Add real contact email and phone.
3. Publish on Vercel.
4. Connect domain.
5. Connect Stripe.
6. Add analytics and SEO pages.
