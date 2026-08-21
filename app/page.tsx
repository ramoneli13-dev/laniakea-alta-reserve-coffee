"use client";

import { useState } from "react";
import { Cart } from "@/components/Cart";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { BrandSections } from "@/components/BrandSections";
import { CoffeeGuide } from "@/components/CoffeeGuide";
import { FAQ } from "@/components/FAQ";
import { TrustBar } from "@/components/TrustBar";
import { products } from "@/data/products";
import type { CartItem, Product } from "@/types";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  function addToCart(product: Product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }

  async function handleCheckout() {
    setCheckoutError("");
    setCheckoutLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity
          }))
        })
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Stripe Checkout could not be started.");
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Stripe Checkout could not be started."
      );
    } finally {
      setCheckoutLoading(false);
    }
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main>
      <Header cartCount={cartCount} />
      <Hero />
      <TrustBar />
      <BrandSections />
      <CoffeeGuide />
      <Products products={products} onAddToCart={addToCart} />
      <Cart
        cartItems={cartItems}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        checkoutError={checkoutError}
        checkoutLoading={checkoutLoading}
      />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
