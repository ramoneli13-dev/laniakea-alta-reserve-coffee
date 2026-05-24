export function BrandSections() {
  const processSteps = [
    "Recolección selectiva",
    "Despulpado",
    "Fermentación controlada",
    "Lavado",
    "Secado",
    "Trillado",
    "Tueste",
    "Molienda",
    "Empaque"
  ];

  const diferenciales = [
    "Origen colombiano con trazabilidad real.",
    "Productor aliado con reconocimientos nacionales.",
    "Selección cuidadosa del grano y del perfil de taza.",
    "Conexión directa entre Colombia y California.",
    "Lotes de café especial con carácter propio.",
    "Enfoque en legado, calidad y excelencia."
  ];

  return (
    <div className="bg-coffee-parchment text-coffee-black">
      <section id="origen" className="bg-[#efe5d1] px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
              Origen y trazabilidad
            </p>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
              Norte de Santander en su máxima expresión de café especial.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-coffee-roast">
              Nuestro café proviene de Ragonvalia, Norte de Santander, una zona montañosa con
              condiciones ideales para cafés especiales. Su perfil de taza puede presentar notas
              como limoncillo, floral, mandarina, dulce, caramelo, nuez, almendra y residual
              con notas vinosas.
            </p>
          </div>

          <aside className="border border-coffee-gold/40 bg-white/70 p-6 shadow-luxury">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coffee-gold">
              Productor aliado verificado
            </p>
            <h3 className="mt-2 font-serif text-3xl text-coffee-espresso">Domingo Torres</h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-coffee-roast">
              <li>• Nacido en Guapi, Cauca.</li>
              <li>• Caficultor en Ragonvalia, Norte de Santander.</li>
              <li>• Reconocido por cafés especiales de alta calidad.</li>
            </ul>
            <div className="mt-5 border-t border-coffee-gold/25 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coffee-gold">Reconocimientos</p>
              <p className="mt-2 text-sm text-coffee-roast">Concurso Nacional de Café Colombia Tierra de Diversidad 2021 · 2022 · 2023.</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Corea del Sur','China','Estados Unidos','Venezuela','Brasil'].map((m) => (
                <span key={m} className="border border-coffee-gold/35 bg-white/80 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-coffee-roast">{m}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Variedades disponibles</p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Geisha", "Perfil limoncillo, floral y mandarina."],
            ["Castillo", "Perfil dulce, caramelo, notas leves a almendra y residual vinoso."],
            ["Bourbon Rosado", "Café especial de alta calidad."]
          ].map(([name, desc], i) => (
            <article key={name} className={`luxury-ring border p-7 shadow-luxury ${i === 0 ? 'border-coffee-gold/45 bg-coffee-black text-coffee-cream' : 'border-coffee-gold/30 bg-white/75 text-coffee-black'}`}>
              <p className="text-xs uppercase tracking-[0.16em] text-coffee-gold">Especialidad</p>
              <h3 className="mt-2 font-serif text-3xl">{name}</h3>
              <p className={`mt-3 leading-7 ${i === 0 ? 'text-coffee-cream/85' : 'text-coffee-roast'}`}>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-coffee-black px-5 py-24 text-coffee-cream md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Proceso y calidad</p>
          <h3 className="max-w-3xl font-serif text-3xl md:text-5xl">Cada etapa cuidada para una taza consistente y elegante.</h3>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 border border-coffee-gold/35 bg-coffee-espresso/45 p-4">
                <span className="inline-flex h-9 w-9 items-center justify-center border border-coffee-gold/40 text-xs font-semibold text-coffee-gold">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-base">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Por qué este café es diferente</p>
        <ul className="grid gap-4 md:grid-cols-2">
          {diferenciales.map((item) => (
            <li key={item} className="border border-coffee-gold/30 bg-white/70 px-5 py-4 text-lg leading-8 text-coffee-roast">{item}</li>
          ))}
        </ul>
      </section>

      <section id="historia" className="bg-[#f4ebd8] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Nuestra historia</p>
          <p className="font-serif text-3xl leading-tight md:text-5xl">Laniakea Alta Reserve Coffee nace en California con raíces colombianas.</p>
          <p className="mt-6 text-xl leading-9 text-coffee-roast">
            Nuestra misión es llevar al mercado estadounidense un café que represente origen,
            familia, esfuerzo y excelencia. No vendemos solo café: compartimos una historia de
            tierra, trabajo y propósito.
          </p>
        </div>
      </section>

      <section className="bg-coffee-black px-5 py-20 text-center text-coffee-cream md:px-8">
        <h2 className="font-serif text-4xl md:text-6xl">De las montañas de Colombia a tu taza.</h2>
        <p className="mx-auto mt-4 max-w-3xl text-coffee-cream/75">Small batches de especialidad con origen trazable y tueste premium.</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#products" className="inline-flex min-h-12 items-center justify-center border border-coffee-gold bg-coffee-gold px-7 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-[#d8b56f]">Comprar café</a>
          <a href="#historia" className="inline-flex min-h-12 items-center justify-center border border-coffee-cream/45 px-7 text-sm font-bold uppercase tracking-[0.18em] text-coffee-cream transition hover:border-coffee-gold hover:text-coffee-gold">Conocer más</a>
        </div>
      </section>
    </div>
  );
}
