const options = [
  { size: "12 oz", title: "Para descubrir", text: "Una excelente puerta de entrada a Laniakea o un regalo con identidad colombiana." },
  { size: "1 lb", title: "Para disfrutar a diario", text: "Más café para el hogar o la oficina, con un perfil de reserva equilibrado." },
  { size: "5 lb", title: "Para tu negocio", text: "El formato pensado para cafés, oficinas, boutiques y hospitalidad." },
];

export function CoffeeGuide() {
  return (
    <section className="bg-coffee-parchment px-5 py-20 text-coffee-black md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-coffee-brown">Elige con confianza</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Una presentación para cada momento.</h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-coffee-black/70">Compara rápidamente los formatos y encuentra el que mejor se adapta a tu forma de disfrutar el café.</p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden border border-coffee-brown/20 bg-coffee-brown/20 md:grid-cols-3">
          {options.map((option) => (
            <article key={option.size} className="bg-coffee-parchment p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-coffee-brown">{option.size}</p>
              <h3 className="mt-4 font-serif text-2xl">{option.title}</h3>
              <p className="mt-3 leading-7 text-coffee-black/68">{option.text}</p>
            </article>
          ))}
        </div>
        <a href="#products" className="mt-8 inline-flex min-h-12 items-center bg-coffee-black px-6 text-sm font-bold uppercase tracking-[0.18em] text-coffee-gold transition hover:bg-coffee-brown">Ver la colección</a>
      </div>
    </section>
  );
}
