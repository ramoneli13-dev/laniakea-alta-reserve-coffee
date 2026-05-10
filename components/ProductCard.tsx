import Image from "next/image";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group overflow-hidden border border-coffee-gold/24 bg-coffee-espresso shadow-luxury">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 bg-coffee-black/78 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-coffee-gold">
          {product.size}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl text-coffee-parchment">{product.name}</h3>
          <span className="text-xl font-semibold text-coffee-gold">${product.price}</span>
        </div>
        <p className="mt-4 leading-7 text-coffee-cream/78">{product.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {product.notes.map((note) => (
            <span
              key={note}
              className="border border-coffee-gold/30 px-3 py-1 text-xs uppercase tracking-[0.14em] text-coffee-cream/80"
            >
              {note}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="mt-7 min-h-12 w-full bg-coffee-gold px-5 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-coffee-cream"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
