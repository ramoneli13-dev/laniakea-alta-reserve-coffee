import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { getClientAddress, hasValidRequestOrigin, isRateLimited } from "@/lib/requestSecurity";
import { getStripe } from "@/lib/stripe";
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
  if (!hasValidRequestOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (isRateLimited(`checkout:${getClientAddress(request)}`, 10, 15 * 60_000)) {
    return NextResponse.json({ error: "Too many checkout attempts." }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  try {
    const body = (await request.json()) as { items?: CheckoutLineItem[] };

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const stripe = getStripe();
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
  } catch {
    return NextResponse.json(
      {
        error: "Stripe Checkout could not be created."
      },
      { status: 400 }
    );
  }
}
