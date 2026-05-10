"use client";

import { useState } from "react";
import { Cart } from "@/components/Cart";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Story } from "@/components/Story";
import { products } from "@/data/products";
import type { CartItem, Product } from "@/types";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  function handleCheckout() {
    // TODO: Replace this alert with a Stripe Checkout integration.
    alert("Checkout will be connected to Stripe in the next phase.");
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main>
      <Header cartCount={cartCount} />
      <Hero />
      <Story />
      <Products products={products} onAddToCart={addToCart} />
      <Cart cartItems={cartItems} onRemove={removeFromCart} onCheckout={handleCheckout} />
      <Contact />
      <Footer />
    </main>
  );
}
