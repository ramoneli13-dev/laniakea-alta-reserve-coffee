import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";

type ProductsProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export function Products({ products, onAddToCart }: ProductsProps) {
  return (
    <section id="products" className="bg-[#120c08] px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
              Colección de Especialidad
            </p>
            <h2 className="max-w-4xl font-serif text-4xl leading-tight text-coffee-parchment md:text-6xl">
              Cafés seleccionados para una experiencia premium de origen colombiano.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-coffee-cream/72">
            Cada lote está diseñado para resaltar perfil de taza, consistencia de tueste y
            carácter de origen desde Norte de Santander.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
