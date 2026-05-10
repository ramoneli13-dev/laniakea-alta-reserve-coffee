import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      <Image
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=90"
        alt="Premium coffee being prepared with a warm luxury atmosphere"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-black via-coffee-black/78 to-coffee-black/34" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(201,164,92,0.22),transparent_30rem)]" />

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
