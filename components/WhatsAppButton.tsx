const whatsappUrl =
  "https://wa.me/16502008821?text=Hola%20Laniakea%2C%20quisiera%20informaci%C3%B3n%20sobre%20su%20caf%C3%A9.";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a Laniakea por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex min-h-12 items-center gap-3 rounded-full border border-white/20 bg-[#1f9d55] px-5 text-sm font-bold text-white shadow-luxury transition hover:-translate-y-1 hover:bg-[#188449]"
    >
      <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full border border-white/70 text-xs">WA</span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
