# Production Deployment & Environment Guide

## 1. Overview
The Learn With Shahariar Client is optimized for deployment on Vercel with automatic CI/CD from the `main` branch.

## 2. Environment Variables Configuration
Configure the following environment variables in Vercel:

| Variable | Type | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Public | Base URL for Express.js production backend server |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Public | Clerk authentication publishable key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public | Stripe payment gateway publishable key |
| `NEXT_PUBLIC_CURRENCY` | Public | Default application currency (`usd`) |

## 3. Deployment Steps
1. Push changes to GitHub `main` branch.
2. Vercel automatically detects Next.js framework build settings.
3. Production build command: `npm run build`
4. Output directory: `.next`
