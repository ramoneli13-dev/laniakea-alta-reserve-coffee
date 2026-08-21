import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "premium-12oz",
    name: "Reserva Colombiana · 12 oz",
    // TODO: Change this price when the final retail price is confirmed.
    price: 24,
    size: "12 oz",
    // TODO: Replace this reference image with final product photography.
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85",
    description:
      "Una presentación versátil para descubrir el carácter del café colombiano en casa o para regalar.",
    notes: ["Cacao", "Azúcar morena", "Final cítrico"],
    origin: "Norte de Santander, Colombia",
    idealFor: "Hogar y regalo"
  },
  {
    id: "alta-reserve-1lb",
    name: "Alta Reserva · 1 lb",
    // TODO: Change this price when the final retail price is confirmed.
    price: 38,
    size: "1 lb",
    // TODO: Replace this reference image with final product photography.
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85",
    description:
      "Un formato amplio para quienes quieren disfrutar con frecuencia un perfil de reserva equilibrado.",
    notes: ["Chocolate oscuro", "Caramelo", "Cuerpo sedoso"],
    origin: "Norte de Santander, Colombia",
    idealFor: "Hogar y oficina"
  },
  {
    id: "wholesale-5lb",
    name: "Formato Mayorista · 5 lb",
    // TODO: Change this price when wholesale pricing is finalized.
    price: 145,
    size: "5 lb",
    // TODO: Replace this reference image with final product photography.
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=85",
    description:
      "Pensado para cafés, oficinas, boutiques y negocios de hospitalidad que buscan café colombiano en volumen.",
    notes: ["Formato comercial", "Tueste consistente", "Atención directa"],
    origin: "Norte de Santander, Colombia",
    idealFor: "Negocios y hospitalidad"
  }
];
