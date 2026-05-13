export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-coffee-black pt-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#050302_0%,#160b06_44%,#2a160b_72%,#070403_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_28%,rgba(201,154,73,0.26),transparent_34rem)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(45deg,rgba(216,173,88,0.12)_1px,transparent_1px),linear-gradient(-45deg,rgba(216,173,88,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />

      <svg
        className="absolute inset-x-0 bottom-0 h-[58%] w-full text-coffee-gold"
        viewBox="0 0 1440 620"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 272L124 214L248 258L372 146L496 248L620 110L744 256L868 196L992 272L1116 156L1240 250L1440 176V620H0Z"
          fill="currentColor"
          opacity="0.16"
        />
        <path
          d="M0 332L160 264L320 324L480 230L640 336L800 242L960 340L1120 282L1280 350L1440 298V620H0Z"
          fill="#080403"
          opacity="0.84"
        />
        <path
          d="M0 388L180 334L360 396L540 320L720 402L900 326L1080 408L1260 352L1440 398V620H0Z"
          fill="#120805"
        />
      </svg>

      <div className="absolute right-6 top-28 hidden h-[520px] w-[520px] rounded-full border border-coffee-gold/20 bg-coffee-gold/5 shadow-luxury lg:block" />
      <div className="absolute right-20 top-40 hidden h-[360px] w-[360px] rounded-full border border-coffee-gold/30 lg:block" />
      <div className="absolute right-32 top-52 hidden h-[210px] w-[210px] rounded-full bg-coffee-gold/10 lg:block" />

      <div className="absolute bottom-20 right-10 hidden max-w-sm rotate-[-4deg] border border-coffee-gold/40 bg-coffee-espresso/90 p-8 shadow-luxury xl:block">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-coffee-gold">
          Alta Reserve
        </p>
        <p className="mt-5 font-serif text-5xl leading-none text-coffee-parchment">Laniakea</p>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-coffee-cream/72">
          Colombian Coffee
        </p>
        <div className="mt-6 h-px bg-coffee-gold/50" />
        <p className="mt-6 text-sm leading-6 text-coffee-cream/70">
          Deep origin, refined roast, crafted with faith and excellence.
        </p>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl content-center px-5 pb-16 md:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-coffee-gold">
            Premium Colombian Coffee
          </p>
          <h1 className="font-serif text-5xl leading-[0.96] text-coffee-parchment md:text-7xl lg:text-8xl">
            Laniakea Alta Reserve Coffee
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-coffee-cream md:text-2xl">
            From the mountains of Colombia to the heart of California
          </p>

          <div className="mt-8 max-w-2xl border-l-2 border-coffee-gold/70 bg-coffee-black/42 px-6 py-5 shadow-luxury backdrop-blur-sm">
            <p className="font-serif text-2xl leading-8 text-coffee-parchment md:text-3xl">
              “Prueben y vean que el Señor es bueno”
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-coffee-gold">
              Salmo 34:8
            </p>
          </div>

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
