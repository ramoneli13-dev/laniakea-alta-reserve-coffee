import Stripe from "stripe";

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || !secretKey.startsWith("sk_")) {
    throw new Error("Stripe is not configured.");
  }

  return new Stripe(secretKey);
}
