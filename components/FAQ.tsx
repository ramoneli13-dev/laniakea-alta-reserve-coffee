const questions = [
  { question: "¿De dónde viene el café Laniakea?", answer: "Nuestro origen está en Ragonvalia, Norte de Santander, Colombia, una región ligada a la historia cafetera de la familia." },
  { question: "¿Qué variedades trabajan?", answer: "La selección de Laniakea incluye Geisha, Castillo y Bourbon Rosado. La disponibilidad puede variar según el lote." },
  { question: "¿Puedo comprar para mi negocio?", answer: "Sí. Atendemos consultas de cafés, oficinas, restaurantes, hoteles y tiendas. Usa el formulario y selecciona “Venta al por mayor”." },
  { question: "¿Cómo consulto molienda y entrega?", answer: "Escríbenos antes de comprar para confirmar las opciones disponibles de molienda, preparación del pedido y entrega para tu ubicación." },
  { question: "¿Cómo debo conservar el café?", answer: "Mantenlo bien cerrado, en un lugar fresco y seco, protegido de la luz directa y lejos de aromas fuertes." },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-[#120c08] px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Antes de comprar</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-coffee-parchment md:text-5xl">Respuestas claras para elegir mejor.</h2>
          <p className="mt-5 leading-7 text-coffee-cream/70">Si necesitas una recomendación personal o comercial, nuestro equipo puede orientarte directamente.</p>
          <a href="#contact" className="mt-7 inline-flex text-sm font-bold uppercase tracking-[0.16em] text-coffee-gold underline decoration-coffee-gold/40 underline-offset-8">Hablar con Laniakea</a>
        </div>
        <div className="divide-y divide-coffee-gold/20 border-y border-coffee-gold/20">
          {questions.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-xl text-coffee-parchment marker:content-none">
                {item.question}<span className="text-coffee-gold transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="max-w-2xl pr-10 pt-4 leading-7 text-coffee-cream/72">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
