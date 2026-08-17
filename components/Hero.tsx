export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-coffee-black">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_48%,rgba(201,164,92,0.2),transparent_34%),radial-gradient(ellipse_at_18%_8%,rgba(118,75,43,0.28),transparent_42%),linear-gradient(135deg,#090604_0%,#160e09_52%,#080503_100%)]"
      >
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(201,164,92,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(201,164,92,0.08)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center justify-center px-5 py-20 md:min-h-screen md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-coffee-gold md:text-sm">
            Laniakea Alta Reserve Coffee · Specialty Colombian Coffee
          </p>
          <h1 className="font-serif text-4xl leading-[1.08] text-coffee-cream md:text-7xl">
            Café especial de Colombia, desde Norte de Santander hasta California.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-coffee-cream/82 md:text-lg">
            Llevamos lotes seleccionados con trazabilidad real, perfil de taza elegante y
            origen auténtico para quienes valoran calidad y propósito.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
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
          <div className="mx-auto mt-12 flex max-w-xl items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-coffee-gold/45" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-coffee-cream/72 sm:text-xs">
              Small batch · Direct origin · Premium roast
            </p>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-coffee-gold/45" />
          </div>
        </div>
      </div>
    </section>
  );
}
