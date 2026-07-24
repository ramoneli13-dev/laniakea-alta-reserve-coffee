import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-coffee-black px-5 py-20 text-coffee-cream">
      <section className="max-w-2xl border border-coffee-gold/35 bg-coffee-espresso p-8 text-center shadow-luxury">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
          Payment Received
        </p>
        <h1 className="font-serif text-4xl text-coffee-parchment md:text-6xl">
          Thank you for your order.
        </h1>
        <p className="mt-6 leading-8 text-coffee-cream/78">
          Your Stripe payment was completed. A receipt and order follow-up can be
          connected here in the next fulfillment phase.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center bg-coffee-gold px-7 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-coffee-cream"
        >
          Back to Laniakea
        </Link>
      </section>
    </main>
  );
}
