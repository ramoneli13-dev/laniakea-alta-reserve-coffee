type HeaderProps = {
  cartCount: number;
};

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="fixed right-3 top-1/2 z-50 -translate-y-1/2 md:right-5">
      <div className="flex flex-col items-center gap-3 border border-coffee-gold/25 bg-coffee-black/48 px-2.5 py-3 shadow-luxury backdrop-blur-md">
        <a
          href="#home"
          className="grid h-9 w-9 place-items-center border border-coffee-gold/60 bg-coffee-espresso/85 text-xs font-semibold text-coffee-gold transition hover:bg-coffee-gold hover:text-coffee-black"
          aria-label="Laniakea home"
        >
          LA
        </a>

        <nav className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-coffee-cream/84">
          <a
            className="[writing-mode:vertical-rl] transition hover:text-coffee-gold"
            href="#story"
          >
            Story
          </a>
          <span className="h-5 w-px bg-coffee-gold/35" />
          <a
            className="[writing-mode:vertical-rl] transition hover:text-coffee-gold"
            href="#products"
          >
            Coffee
          </a>
          <span className="h-5 w-px bg-coffee-gold/35" />
          <a
            className="hidden [writing-mode:vertical-rl] transition hover:text-coffee-gold sm:block"
            href="#wholesale"
          >
            Wholesale
          </a>
          <span className="hidden h-5 w-px bg-coffee-gold/35 sm:block" />
          <a
            className="[writing-mode:vertical-rl] transition hover:text-coffee-gold"
            href="#contact"
          >
            Contact
          </a>
        </nav>

        <a
          href="#cart"
          className="grid h-9 w-9 place-items-center border border-coffee-gold/45 bg-coffee-black/55 text-[10px] font-bold text-coffee-gold transition hover:bg-coffee-gold hover:text-coffee-black"
          aria-label={`Cart with ${cartCount} items`}
          title={`Cart (${cartCount})`}
        >
          {cartCount}
        </a>
      </div>
    </header>
  );
}
