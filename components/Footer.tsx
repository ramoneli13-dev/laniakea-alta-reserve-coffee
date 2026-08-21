export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-coffee-gold/20 bg-coffee-black px-5 py-12 text-coffee-cream/70 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_0.75fr_0.75fr]">
        <div>
          <p className="font-serif text-2xl text-coffee-parchment">Laniakea Alta Reserve Coffee</p>
          <p className="mt-4 max-w-lg text-sm leading-7">
          Laniakea nació del sueño de llevar el verdadero sabor del café
          colombiano a quienes saben apreciar algo auténtico.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-coffee-gold">Explorar</p>
          <nav className="mt-4 grid gap-3 text-sm">
            <a className="hover:text-coffee-gold" href="#story">Nuestra historia</a>
            <a className="hover:text-coffee-gold" href="#products">Comprar café</a>
            <a className="hover:text-coffee-gold" href="#faq">Preguntas frecuentes</a>
          </nav>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-coffee-gold">Atención</p>
          <nav className="mt-4 grid gap-3 text-sm">
            <a className="hover:text-coffee-gold" href="#wholesale">Venta al por mayor</a>
            <a className="hover:text-coffee-gold" href="#contact">Contacto</a>
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-coffee-gold/15 pt-6 text-xs">
        © {year} Laniakea Alta Reserve Coffee. Café colombiano con raíces en Norte de Santander.
      </div>
    </footer>
  );
}
