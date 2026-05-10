type HeaderProps = {
  cartCount: number;
};

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-coffee-gold/20 bg-coffee-black/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="Laniakea home">
          <span className="grid h-11 w-11 place-items-center border border-coffee-gold/70 bg-coffee-espresso text-sm font-semibold text-coffee-gold">
            LA
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg text-coffee-parchment">Laniakea</span>
            <span className="block text-xs uppercase tracking-[0.24em] text-coffee-gold">
              Alta Reserve Coffee
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-coffee-cream/82 md:flex">
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
          className="border border-coffee-gold/50 px-4 py-2 text-sm font-semibold text-coffee-gold transition hover:bg-coffee-gold hover:text-coffee-black"
        >
          Cart ({cartCount})
        </a>
      </div>
    </header>
  );
}
