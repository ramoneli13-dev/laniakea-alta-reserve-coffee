import Image from "next/image";

export function Story() {
  return (
    <section id="story" className="bg-coffee-parchment px-5 py-24 text-coffee-black md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="luxury-ring relative min-h-[520px] overflow-hidden bg-coffee-espresso shadow-luxury">
          <Image
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=90"
            alt="Coffee beans and premium coffee cup"
            fill
            className="object-cover opacity-90"
          />
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
            Our Story
          </p>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            Grandeza, origen, familia y proposito en cada taza.
          </h2>
          {/* TODO: Edit this story as the brand narrative becomes more detailed. */}
          <div className="mt-8 space-y-5 text-lg leading-8 text-coffee-roast">
            <p>
              Laniakea represents a sense of greatness and origin: a reserve coffee created
              with purpose, family, and respect for the land that gives it life.
            </p>
            <p>
             Más que una empresa de café, Laniakea es una expresión de legado, visión y excelencia, 
             creada para compartir la esencia más fina del café colombiano.
        
            </p>
            <p>
              Our coffee comes from Gramalote, Norte de Santander, Colombia, a mountain
              region with the character, altitude, and heritage behind an exceptional cup.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {["Gramalote Origin", "California Born", "Alta Reserve"].map((item) => (
              <div key={item} className="border border-coffee-gold/40 bg-white/55 p-5">
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-coffee-roast">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
