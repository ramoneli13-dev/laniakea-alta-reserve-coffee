"use client";

import { useEffect, useState } from "react";

type HeaderProps = {
  cartCount: number;
};

const navLinks = [
  { href: "#story", label: "Historia" },
  { href: "#products", label: "Café" },
  { href: "#wholesale", label: "Venta al por mayor" },
  { href: "#contact", label: "Contacto" },
];

export function Header({ cartCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5 md:px-6">
        <div
          className={`relative mx-auto flex h-12 max-w-7xl items-center justify-between rounded-[8px] border px-3 text-coffee-cream transition-all duration-300 md:h-[54px] md:px-4 ${
            isScrolled
              ? "border-coffee-gold/28 bg-coffee-black/82 shadow-luxury backdrop-blur-xl"
              : "border-coffee-gold/10 bg-coffee-black/18 shadow-none backdrop-blur-sm"
          }`}
        >
          <a
            href="#home"
            className="flex items-center gap-2 text-coffee-cream transition hover:text-coffee-gold"
            aria-label="Laniakea home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-[6px] border border-coffee-gold/50 bg-coffee-black/45 text-[11px] font-semibold tracking-[0.18em] text-coffee-gold">
              LA
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] sm:inline">
              Laniakea
            </span>
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-coffee-cream/82 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="whitespace-nowrap transition hover:text-coffee-gold"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#products"
            className="hidden items-center gap-2 rounded-[6px] border border-coffee-gold/55 bg-coffee-gold/12 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-coffee-gold transition hover:bg-coffee-gold hover:text-coffee-black md:inline-flex"
            aria-label={`Comprar café, carrito con ${cartCount} productos`}
            title={`Carrito (${cartCount})`}
          >
            Comprar
          </a>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-[6px] border border-coffee-gold/40 bg-coffee-black/35 text-coffee-gold transition hover:bg-coffee-gold hover:text-coffee-black md:hidden"
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="flex h-4 w-5 flex-col justify-between" aria-hidden="true">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-coffee-black/58 backdrop-blur-sm md:hidden"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 right-0 z-[70] w-[82vw] max-w-80 border-l border-coffee-gold/25 bg-coffee-black/88 px-6 py-5 text-coffee-cream shadow-luxury backdrop-blur-xl transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 text-coffee-cream"
            aria-label="Laniakea home"
            onClick={closeMenu}
          >
            <span className="grid h-8 w-8 place-items-center rounded-[6px] border border-coffee-gold/55 bg-coffee-gold/10 text-[11px] font-semibold tracking-[0.18em] text-coffee-gold">
              LA
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">
              Laniakea
            </span>
          </a>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-[6px] border border-coffee-gold/35 text-coffee-gold transition hover:bg-coffee-gold hover:text-coffee-black"
            aria-label="Cerrar menú"
            onClick={closeMenu}
          >
            <span className="relative h-4 w-4" aria-hidden="true">
              <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <nav className="mt-12 flex flex-col gap-5 text-sm font-semibold uppercase tracking-[0.16em] text-coffee-cream/86">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="border-b border-coffee-gold/12 pb-4 transition hover:text-coffee-gold"
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 grid gap-3">
          <a
            href="#products"
            className="rounded-[6px] border border-coffee-gold/55 bg-coffee-gold/12 px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-coffee-gold transition hover:bg-coffee-gold hover:text-coffee-black"
            onClick={closeMenu}
          >
            Comprar
          </a>
          <a
            href="#cart"
            className="rounded-[6px] border border-coffee-gold/25 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-coffee-cream/78 transition hover:border-coffee-gold/55 hover:text-coffee-gold"
            onClick={closeMenu}
          >
            Carrito ({cartCount})
          </a>
        </div>
      </aside>
    </>
  );
}
