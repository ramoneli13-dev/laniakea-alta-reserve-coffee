import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-coffee-black md:min-h-screen"
    >
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/laniakea-cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover object-center opacity-45 blur-sm"
        />
        <div className="absolute inset-0 bg-coffee-black/58" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-start justify-center px-0 pb-10 pt-20 md:hidden">
        <div className="relative w-full shadow-luxury">
          <Image
            src="/images/laniakea-cover.jpg"
            alt="Laniakea Alta Reserve Coffee premium Colombian coffee cover artwork"
            width={1536}
            height={864}
            priority
            sizes="100vw"
            className="h-auto w-full object-contain"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-coffee-black/16 via-transparent to-coffee-black/20" />
        </div>
      </div>

      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/laniakea-cover.jpg"
          alt="Laniakea Alta Reserve Coffee premium Colombian coffee cover artwork"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-coffee-black/10" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-coffee-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-coffee-black to-transparent" />
      </div>
    </section>
  );
}
