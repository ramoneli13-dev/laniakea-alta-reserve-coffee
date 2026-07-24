import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";

type ProductsProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};

export function Products({ products, onAddToCart }: ProductsProps) {
  return (
    <section id="products" className="bg-coffee-black px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
              Shop Coffee
            </p>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight text-coffee-parchment md:text-6xl">
              Premium Colombian coffee for homes, offices, and wholesale partners.
            </h2>
          </div>
          <p className="max-w-md leading-7 text-coffee-cream/72">
            Esta primera colección marca el inicio de una visión más grande: construir
            una marca de café premium con identidad, excelencia y crecimiento comercial
            sostenible.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
