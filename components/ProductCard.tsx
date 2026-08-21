import Image from "next/image";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-coffee-gold/24 bg-coffee-espresso shadow-luxury">
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 46vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 bg-coffee-black/78 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-coffee-gold">
          {product.size}
        </div>
        <span className="absolute bottom-3 right-3 bg-coffee-black/72 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-coffee-cream/70">
          Imagen de referencia
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl leading-tight text-coffee-parchment sm:text-2xl">
            {product.name}
          </h3>
          <span className="shrink-0 text-lg font-semibold text-coffee-gold">${product.price}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-coffee-cream/78">{product.description}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-coffee-gold/18 py-3 text-xs sm:text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.14em] text-coffee-gold">Origen</dt>
            <dd className="mt-1 leading-5 text-coffee-cream/82">{product.origin}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.14em] text-coffee-gold">Ideal para</dt>
            <dd className="mt-1 leading-5 text-coffee-cream/82">{product.idealFor}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.notes.map((note) => (
            <span
              key={note}
              className="border border-coffee-gold/30 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-coffee-cream/80"
            >
              {note}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="mt-auto flex min-h-11 w-full items-center justify-center bg-coffee-gold px-4 text-xs font-bold uppercase tracking-[0.16em] text-coffee-black transition hover:bg-coffee-cream"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
