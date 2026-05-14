import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-coffee-black">
      <Image
        src="/images/laniakea-cover.jpg"
        alt="Laniakea Alta Reserve Coffee premium Colombian coffee cover artwork"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-coffee-black to-transparent" />
    </section>
  );
}
