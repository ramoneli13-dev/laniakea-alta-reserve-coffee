import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/data/products";
import type { CheckoutLineItem } from "@/types";

export const runtime = "nodejs";

function getAppUrl(request: NextRequest) {
  return process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
}

function getValidatedItems(items: CheckoutLineItem[]) {
  return items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error("Invalid cart item.");
    }

    return { product, quantity };
  });
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 500 }
    );
  }

  if (!secretKey.startsWith("sk_")) {
    return NextResponse.json(
      {
        error:
          "Stripe secret key is invalid. STRIPE_SECRET_KEY must start with sk_test_ or sk_live_."
      },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as { items?: CheckoutLineItem[] };

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const stripe = new Stripe(secretKey);
    const appUrl = getAppUrl(request);
    const validatedItems = getValidatedItems(body.items);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US"]
      },
      line_items: validatedItems.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image],
            metadata: {
              productId: product.id,
              size: product.size
            }
          }
        }
      })),
      metadata: {
        brand: "Laniakea Alta Reserve Coffee",
        source: "web_checkout"
      },
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Stripe Checkout could not be created."
      },
      { status: 400 }
    );
  }
}
