import Link from "next/link";
import { getStripe } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  let paid = false;

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
    } catch {
      paid = false;
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-coffee-black px-5 py-20 text-coffee-cream">
      <section className="max-w-2xl border border-coffee-gold/35 bg-coffee-espresso p-8 text-center shadow-luxury">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
          {paid ? "Pago verificado" : "Pago no verificado"}
        </p>
        <h1 className="font-serif text-4xl text-coffee-parchment md:text-6xl">
          {paid ? "Gracias por tu pedido." : "No pudimos confirmar el pago."}
        </h1>
        <p className="mt-6 leading-8 text-coffee-cream/78">
          {paid
            ? "Stripe confirmó que el pago fue recibido. Conserva el recibo enviado a tu correo."
            : "Regresa a la tienda o revisa tu recibo de Stripe antes de intentar pagar nuevamente."}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-coffee-gold px-7 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-coffee-cream"
        >
          Volver a Laniakea
        </Link>
      </section>
    </main>
  );
}
