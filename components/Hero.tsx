import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-coffee-black">
      <div className="absolute inset-0">
        <Image
          src="/images/laniakea-cover.jpg"
          alt="Laniakea Alta Reserve Coffee en origen colombiano"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,164,92,0.12),transparent_48%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-black via-coffee-black/82 to-coffee-black/45" />
        <div className="absolute inset-0 bg-coffee-black/35" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-8 px-5 py-16 md:min-h-screen md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-coffee-gold md:text-sm">
            Laniakea Alta Reserve Coffee · Specialty Colombian Coffee
          </p>
          <h1 className="font-serif text-4xl leading-[1.08] text-coffee-cream md:text-7xl">
            Café especial de Colombia, desde Norte de Santander hasta California.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-coffee-cream/82 md:text-lg">
            Llevamos lotes seleccionados con trazabilidad real, perfil de taza elegante y
            origen auténtico para quienes valoran calidad y propósito.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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

        <div className="justify-self-end self-end md:self-center">
          <div className="relative w-[240px] rounded-sm border border-coffee-gold/35 bg-coffee-black/40 p-3 backdrop-blur-sm sm:w-[280px] md:w-[340px]">
            <Image
              src="/images/laniakea-official.png"
              alt="Empaque premium de Laniakea Alta Reserve Coffee"
              width={900}
              height={900}
              className="h-auto w-full object-contain"
            />
            <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-coffee-cream/72 md:text-xs">
              Small batch · Direct origin · Premium roast
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
