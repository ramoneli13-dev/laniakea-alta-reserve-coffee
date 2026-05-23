export function BrandSections() {
  const processSteps = [
    "Recolección",
    "Despulpado",
    "Fermentación",
    "Lavado",
    "Secado",
    "Trillado",
    "Tueste",
    "Molienda",
    "Empaque"
  ];

  const diferenciales = [
    "Café de origen colombiano.",
    "Productor con trayectoria y premios.",
    "Selección cuidadosa del grano.",
    "Historia real detrás del producto.",
    "Conexión directa entre Colombia y California.",
    "Enfoque en calidad, legado y excelencia."
  ];

  return (
    <div className="bg-coffee-parchment text-coffee-black">
      <section id="origen" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
          Nuestro productor aliado
        </p>
        <h2 className="font-serif text-4xl leading-tight md:text-6xl">Domingo Torres</h2>
        <div className="mt-8 grid gap-4 text-lg leading-8 text-coffee-roast md:grid-cols-2">
          <p>Productor colombiano nacido en Guapi, Cauca.</p>
          <p>Caficultor establecido en Ragonvalia, Norte de Santander.</p>
          <p>Reconocido por producir cafés especiales de alta calidad.</p>
          <p>
            Ganador de reconocimientos nacionales en el Concurso Nacional de Café Colombia
            Tierra de Diversidad durante 2021, 2022 y 2023.
          </p>
          <p className="md:col-span-2">
            Su café ha llegado a mercados internacionales como Corea del Sur, China,
            Estados Unidos, Venezuela y Brasil.
          </p>
        </div>
      </section>

      <section className="bg-[#f4ebd8] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Origen del café</p>
          <p className="max-w-5xl text-xl leading-9 text-coffee-roast">
            Nuestro café proviene de Ragonvalia, Norte de Santander, una zona montañosa con
            condiciones ideales para cafés especiales. Su perfil de taza puede presentar notas
            como limoncillo, floral, mandarina, dulce, caramelo, nuez, almendra y residual con
            notas vinosas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Variedades disponibles</p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Geisha", "Perfil limoncillo, floral y mandarina."],
            ["Castillo", "Perfil dulce, caramelo, notas leves a almendra y residual vinoso."],
            ["Bourbon Rosado", "Café especial de alta calidad."]
          ].map(([name, desc]) => (
            <article key={name} className="luxury-ring border border-coffee-gold/35 bg-white/70 p-7 shadow-luxury">
              <h3 className="font-serif text-3xl text-coffee-espresso">{name}</h3>
              <p className="mt-3 leading-7 text-coffee-roast">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-coffee-black px-5 py-24 text-coffee-cream md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Proceso y calidad</p>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="border border-coffee-gold/35 bg-coffee-espresso/45 p-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-coffee-gold">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Por qué este café es diferente</p>
        <ul className="grid gap-4 text-lg leading-8 text-coffee-roast md:grid-cols-2">
          {diferenciales.map((item) => (
            <li key={item} className="border-l-2 border-coffee-gold bg-white/60 px-5 py-3">{item}</li>
          ))}
        </ul>
      </section>

      <section id="historia" className="bg-[#f4ebd8] px-5 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Nuestra historia</p>
          <p className="text-xl leading-9 text-coffee-roast">
            Laniakea Alta Reserve Coffee nace en California con raíces colombianas. Nuestra
            misión es llevar al mercado estadounidense un café que represente origen, familia,
            esfuerzo y excelencia. No vendemos solo café: compartimos una historia de tierra,
            trabajo y propósito.
          </p>
        </div>
      </section>

      <section className="bg-coffee-black px-5 py-20 text-center text-coffee-cream md:px-8">
        <h2 className="font-serif text-4xl md:text-6xl">De las montañas de Colombia a tu taza.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#products" className="border border-coffee-gold bg-coffee-gold px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-[#d8b56f]">Comprar café</a>
          <a href="#historia" className="border border-coffee-cream/45 px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-coffee-cream transition hover:border-coffee-gold hover:text-coffee-gold">Conocer más</a>
        </div>
      </section>
    </div>
  );
}
