import Link from "next/link";

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
            <Link className="hover:text-coffee-gold" href="/#story">Nuestra historia</Link>
            <Link className="hover:text-coffee-gold" href="/#products">Comprar café</Link>
            <Link className="hover:text-coffee-gold" href="/#faq">Preguntas frecuentes</Link>
          </nav>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-coffee-gold">Atención</p>
          <nav className="mt-4 grid gap-3 text-sm">
            <Link className="hover:text-coffee-gold" href="/#wholesale-application">Solicitud mayorista</Link>
            <Link className="hover:text-coffee-gold" href="/#contact">Contacto</Link>
            <a className="hover:text-coffee-gold" href="https://wa.me/16502008821" target="_blank" rel="noreferrer">WhatsApp</a>
          </nav>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-coffee-gold/15 pt-6 text-xs md:flex-row md:items-center md:justify-between">
        <span>© {year} Laniakea Alta Reserve Coffee LLC. Café colombiano con raíces en Norte de Santander.</span>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link className="hover:text-coffee-gold" href="/legal#privacy">Privacidad</Link>
          <Link className="hover:text-coffee-gold" href="/legal#terms">Términos</Link>
          <Link className="hover:text-coffee-gold" href="/legal#shipping">Envíos</Link>
          <Link className="hover:text-coffee-gold" href="/legal#returns">Devoluciones</Link>
        </nav>
      </div>
    </footer>
  );
}
