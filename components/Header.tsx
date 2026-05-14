type HeaderProps = {
  cartCount: number;
};

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-coffee-gold/15 bg-coffee-black/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:px-7">
        <a href="#home" className="flex items-center gap-2.5" aria-label="Laniakea home">
          <span className="grid h-8 w-8 place-items-center border border-coffee-gold/60 bg-coffee-espresso text-xs font-semibold text-coffee-gold">
            LA
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base text-coffee-parchment">Laniakea</span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-coffee-gold">
              Alta Reserve Coffee
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-xs text-coffee-cream/82 md:flex">
          <a className="transition hover:text-coffee-gold" href="#story">
            Story
          </a>
          <a className="transition hover:text-coffee-gold" href="#products">
            Coffee
          </a>
          <a className="transition hover:text-coffee-gold" href="#wholesale">
            Wholesale
          </a>
          <a className="transition hover:text-coffee-gold" href="#contact">
            Contact
          </a>
        </nav>

        <a
          href="#cart"
          className="border border-coffee-gold/45 px-3 py-1.5 text-xs font-semibold text-coffee-gold transition hover:bg-coffee-gold hover:text-coffee-black"
        >
          Cart ({cartCount})
        </a>
      </div>
    </header>
  );
}
