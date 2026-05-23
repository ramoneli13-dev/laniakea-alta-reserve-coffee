import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-coffee-black md:min-h-screen"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/laniakea-cover.jpg"
          alt="Laniakea Alta Reserve Coffee premium Colombian coffee cover artwork"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-coffee-black/55" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-5 py-20 md:px-8">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
            Laniakea Alta Reserve Coffee
          </p>
          <h1 className="font-serif text-4xl leading-tight text-coffee-cream md:text-7xl">
            Café especial de Colombia, desde Norte de Santander hasta California.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-coffee-cream/90 md:text-xl">
            Laniakea Alta Reserve Coffee nace para conectar familias, historia y excelencia
            cafetera, trabajando con productores reconocidos como Domingo Torres.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#origen" className="border border-coffee-gold bg-coffee-gold px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-[#d8b56f]">
              Conoce nuestro origen
            </a>
            <a href="#products" className="border border-coffee-cream/45 px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-coffee-cream transition hover:border-coffee-gold hover:text-coffee-gold">
              Ver cafés disponibles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
