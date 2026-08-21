import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Políticas legales | Laniakea Alta Reserve Coffee" };

const sections = [
  { id: "privacy", title: "Política de Privacidad", body: [
    "Recopilamos la información que nos entregas voluntariamente, como nombre, correo, teléfono, empresa, ubicación general y contenido de tus mensajes o pedidos.",
    "Usamos esos datos para responder consultas, procesar solicitudes comerciales, prestar servicio al cliente, prevenir fraude y cumplir obligaciones legales. No vendemos tu información personal.",
    "Podemos compartir datos con proveedores que ayudan a operar el sitio, procesar pagos, enviar correos o entregar pedidos, únicamente para prestar esos servicios. Conservamos la información durante el tiempo razonablemente necesario para esos fines y para cumplir la ley.",
    "Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a laniakea280@gmail.com. Verificaremos la solicitud antes de responder. No discriminamos a quien ejerza los derechos que le correspondan bajo la ley de California.",
  ]},
  { id: "terms", title: "Términos de Uso y Venta", body: [
    "Al usar este sitio aceptas estos términos. La información del sitio puede actualizarse sin previo aviso. Las imágenes identificadas como referencia no sustituyen la presentación final del producto.",
    "Los precios, impuestos, inventario y costos de entrega aplicables se muestran o confirman antes de finalizar el pedido. Colocar un pedido no garantiza su aceptación; podremos cancelarlo y reembolsarlo si existe un error de precio, falta de inventario, sospecha de fraude o imposibilidad de entrega.",
    "El contenido, nombre y elementos de marca de Laniakea no pueden copiarse ni explotarse comercialmente sin autorización. En la máxima medida permitida por la ley, nuestra responsabilidad relacionada con una compra no excederá el importe pagado por el producto afectado.",
  ]},
  { id: "shipping", title: "Política de Envíos", body: [
    "Las zonas disponibles, tarifas y estimaciones de entrega se muestran durante el proceso de compra o se confirman por escrito. Una estimación no es una garantía y puede verse afectada por el transportista, clima, dirección incorrecta u otras circunstancias fuera de nuestro control.",
    "El comprador debe revisar y proporcionar una dirección completa. Si un paquete aparece como entregado pero no se encuentra, debe comunicarse con nosotros y con el transportista lo antes posible para iniciar la revisión correspondiente.",
  ]},
  { id: "returns", title: "Devoluciones y Reembolsos", body: [
    "Por tratarse de un producto alimenticio, no aceptamos devoluciones por cambio de opinión una vez abierto el empaque. Si el pedido llega dañado, incorrecto o con un defecto, contáctanos dentro de los 7 días posteriores a la entrega e incluye número de pedido, descripción y fotografías.",
    "Evaluaremos cada caso y, cuando corresponda, ofreceremos reposición, crédito o reembolso al método de pago original. Nada en esta política limita derechos que no puedan excluirse bajo la ley aplicable.",
  ]},
];

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-coffee-black text-coffee-cream">
      <header className="border-b border-coffee-gold/20 px-5 py-6 md:px-8"><div className="mx-auto flex max-w-5xl items-center justify-between gap-5"><Link href="/" className="font-serif text-xl text-coffee-parchment">Laniakea</Link><Link href="/" className="text-xs font-bold uppercase tracking-[0.16em] text-coffee-gold">Volver a la tienda</Link></div></header>
      <article className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">Información legal</p>
        <h1 className="mt-4 font-serif text-4xl text-coffee-parchment md:text-6xl">Políticas de Laniakea</h1>
        <p className="mt-5 max-w-2xl leading-7 text-coffee-cream/70">Vigentes desde el 21 de agosto de 2026. Estas políticas describen cómo operamos el sitio y atendemos tus datos y compras.</p>
        <nav className="mt-10 flex flex-wrap gap-3">{sections.map(section => <a key={section.id} href={`#${section.id}`} className="border border-coffee-gold/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-coffee-gold">{section.title}</a>)}</nav>
        <div className="mt-16 grid gap-16">{sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-8 border-t border-coffee-gold/25 pt-8"><h2 className="font-serif text-3xl text-coffee-parchment md:text-4xl">{section.title}</h2><div className="mt-6 grid gap-5">{section.body.map(paragraph => <p key={paragraph} className="max-w-3xl leading-8 text-coffee-cream/72">{paragraph}</p>)}</div></section>)}</div>
        <aside className="mt-16 border border-coffee-gold/30 bg-coffee-espresso p-6"><h2 className="font-serif text-2xl text-coffee-parchment">Contacto sobre estas políticas</h2><p className="mt-3 leading-7 text-coffee-cream/72">Laniakea Alta Reserve Coffee LLC · California, Estados Unidos<br />Correo: <a className="text-coffee-gold underline" href="mailto:laniakea280@gmail.com">laniakea280@gmail.com</a> · WhatsApp: <a className="text-coffee-gold underline" href="https://wa.me/16502008821">+1 (650) 200-8821</a></p></aside>
      </article>
      <Footer />
    </main>
  );
}
