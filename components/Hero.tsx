import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      <Image
        src="/images/laniakea-official.png"
        alt="Laniakea Alta Reserve Coffee official family brand image overlooking the California hills"
        fill
        priority
        sizes="100vw"
        className="object-contain object-center opacity-95"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-black via-coffee-black/82 to-coffee-black/18" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-coffee-black to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl content-center px-5 pb-16 md:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-coffee-gold">
            Premium Colombian Coffee
          </p>
          <h1 className="font-serif text-5xl leading-[0.96] text-coffee-parchment md:text-7xl lg:text-8xl">
            Laniakea Alta Reserve Coffee
          </h1>
          {/* TODO: Adjust the brand phrase if the final slogan changes. */}
          <p className="mt-7 max-w-2xl text-xl leading-8 text-coffee-cream md:text-2xl">
            From the mountains of Colombia to the heart of California
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#products"
              className="inline-flex min-h-12 items-center justify-center bg-coffee-gold px-7 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-coffee-cream"
            >
              Shop Coffee
            </a>
            <a
              href="#story"
              className="inline-flex min-h-12 items-center justify-center border border-coffee-cream/45 px-7 text-sm font-bold uppercase tracking-[0.18em] text-coffee-cream transition hover:border-coffee-gold hover:text-coffee-gold"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
