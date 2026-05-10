import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "premium-12oz",
    name: "12 oz Premium Colombian Coffee",
    // TODO: Change this price when the final retail price is confirmed.
    price: 24,
    size: "12 oz",
    // TODO: Replace this reference image with final product photography.
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85",
    description:
      "A polished daily reserve coffee with a smooth body, elegant aroma, and the warmth of Colombian mountain terroir.",
    notes: ["Cocoa", "Brown sugar", "Citrus finish"]
  },
  {
    id: "alta-reserve-1lb",
    name: "1 lb Alta Reserve Coffee",
    // TODO: Change this price when the final retail price is confirmed.
    price: 38,
    size: "1 lb",
    // TODO: Replace this reference image with final product photography.
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85",
    description:
      "A premium bag for homes and offices that want a deeper reserve profile with a refined roast character.",
    notes: ["Dark chocolate", "Caramel", "Velvet body"]
  },
  {
    id: "wholesale-5lb",
    name: "5 lb Wholesale Bag",
    // TODO: Change this price when wholesale pricing is finalized.
    price: 145,
    size: "5 lb",
    // TODO: Replace this reference image with final product photography.
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85",
    description:
      "Built for cafes, offices, boutiques, and hospitality partners looking for premium Colombian coffee in volume.",
    notes: ["Wholesale ready", "Consistent roast", "Partner support"]
  }
];
