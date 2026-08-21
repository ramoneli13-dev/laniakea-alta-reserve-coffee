const trustItems = [
  ["Origen", "Ragonvalia, Norte de Santander"],
  ["Selección", "Café colombiano de especialidad"],
  ["Raíces", "Tradición familiar cafetera"],
  ["Atención", "Pedidos personales y comerciales"],
];

export function TrustBar() {
  return (
    <section aria-label="Lo esencial de Laniakea" className="border-y border-coffee-gold/20 bg-coffee-espresso px-5 py-7 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(([label, value]) => (
          <div key={label} className="border-l border-coffee-gold/35 pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coffee-gold">{label}</p>
            <p className="mt-2 text-sm leading-6 text-coffee-cream/82">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
