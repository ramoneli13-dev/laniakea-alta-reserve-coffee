import Image from "next/image";

const brandProof = [
  ["Origen", "Norte de Santander"],
  ["Selección", "Lotes de especialidad"],
  ["Propósito", "Herencia · Fe · Excelencia"],
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#17150f] text-coffee-cream"
    >
      <Image
        src="/images/laniakea-cover-portola-neutral.jpg"
        alt="Empaque de café Laniakea Alta Reserve frente a un atardecer natural inspirado en Portola, California"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] sm:object-[64%_center] lg:object-center"
      />
      <div className="absolute inset-0 bg-black/12" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#11110f]/92 via-[#171711]/64 to-transparent lg:via-[#171711]/38" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#11110f]/72 via-transparent to-[#11110f]/24" />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col px-5 pb-8 pt-28 md:px-8 md:pb-10 md:pt-36 lg:justify-center lg:pb-32 lg:pt-32">
        <div className="max-w-[680px]">
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-10 bg-coffee-gold" aria-hidden="true" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-coffee-gold sm:text-xs">
              Café colombiano de alta reserva
            </p>
          </div>

          <h1 className="max-w-[650px] font-serif text-[clamp(3rem,6.4vw,6.2rem)] leading-[0.96] tracking-[-0.035em] text-[#f5ead8]">
            El origen se siente en cada taza.
          </h1>

          <p className="mt-7 max-w-[590px] text-base leading-7 text-coffee-cream/74 sm:text-lg sm:leading-8">
            Café de especialidad cultivado en las montañas de Norte de Santander y
            llevado a California con trazabilidad, carácter y un propósito que trasciende.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#products"
              className="inline-flex min-h-[52px] items-center justify-center bg-coffee-gold px-8 text-xs font-bold uppercase tracking-[0.2em] text-coffee-black transition hover:bg-[#dfbf7a]"
            >
              Descubrir nuestros cafés
            </a>
            <a
              href="#origen"
              className="inline-flex min-h-[52px] items-center justify-center border border-coffee-cream/30 px-8 text-xs font-bold uppercase tracking-[0.2em] text-coffee-cream transition hover:border-coffee-gold hover:text-coffee-gold"
            >
              Conocer el origen
            </a>
          </div>
        </div>

        <div className="mt-auto grid border-y border-coffee-gold/24 bg-[#17150f]/72 backdrop-blur-md sm:grid-cols-3 lg:absolute lg:inset-x-8 lg:bottom-10 lg:mt-0">
          {brandProof.map(([label, value], index) => (
            <div
              key={label}
              className={`px-5 py-4 sm:px-6 ${
                index < brandProof.length - 1
                  ? "border-b border-coffee-gold/18 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-coffee-gold/80">
                {label}
              </p>
              <p className="mt-1.5 text-sm text-coffee-cream/86">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
