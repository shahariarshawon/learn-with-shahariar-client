export const APP_CONFIG = {
  appName: "Learn With Shahariar",
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://learn-with-shahariar-server.vercel.app",
  currency: process.env.NEXT_PUBLIC_CURRENCY || "usd",
  allowedEducatorEmail: "shahariarshawon.dev@gmail.com",
  discordCommunityUrl: "https://discord.gg/PFQvSaHwwy",
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
};
