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
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-black/85 via-coffee-black/65 to-coffee-black/45 md:from-coffee-black/78 md:via-coffee-black/58 md:to-coffee-black/40" />
        <div className="absolute inset-0 bg-coffee-black/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-5 py-16 md:px-8 md:py-20">
        <div className="max-w-3xl rounded-sm border border-coffee-gold/30 bg-coffee-black/38 p-6 backdrop-blur-[2px] md:p-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-coffee-gold md:text-sm">
            Laniakea Alta Reserve Coffee
          </p>
          <h1 className="font-serif text-4xl leading-tight text-coffee-cream md:text-6xl md:leading-[1.08]">
            Café especial de Colombia, desde Norte de Santander hasta California.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-coffee-cream/88 md:text-lg">
            Conectamos origen, familia y excelencia cafetera con trazabilidad real desde
            productores aliados en Norte de Santander.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#origen"
              className="inline-flex min-h-12 items-center justify-center border border-coffee-gold bg-coffee-gold px-7 text-sm font-bold uppercase tracking-[0.16em] text-coffee-black transition hover:bg-[#d8b56f]"
            >
              Conoce nuestro origen
            </a>
            <a
              href="#products"
              className="inline-flex min-h-12 items-center justify-center border border-coffee-cream/45 px-7 text-sm font-bold uppercase tracking-[0.16em] text-coffee-cream transition hover:border-coffee-gold hover:text-coffee-gold"
            >
              Ver cafés disponibles
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
