"use client";

import { FormEvent, useState } from "react";

export function Contact() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Thank you. Your message is ready to be connected to email or a CRM.");
    event.currentTarget.reset();
  }

  return (
    <section id="contact" className="bg-coffee-black px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
            Contact
          </p>
          <h2 className="font-serif text-4xl leading-tight text-coffee-parchment md:text-6xl">
            Bring Laniakea to your home, office, cafe, or boutique.
          </h2>
          <p className="mt-6 text-lg leading-8 text-coffee-cream/76">
            Send us your information and we will follow up for retail orders, tasting
            requests, and partnership opportunities in California and across the United
            States.
          </p>

          <div
            id="wholesale"
            className="mt-10 border border-coffee-gold/35 bg-coffee-espresso p-6"
          >
            <h3 className="font-serif text-2xl text-coffee-parchment">
              Wholesale Orders
            </h3>
            {/* TODO: Update wholesale terms, minimum order quantity, and business email. */}
            <p className="mt-3 leading-7 text-coffee-cream/76">
              For restaurants, cafes, offices, hotels, and specialty shops, ask about the
              5 lb Wholesale Bag, recurring supply, and private tasting options.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 border border-coffee-gold/35 bg-coffee-espresso p-6 shadow-luxury">
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Name
            <input
              required
              name="name"
              className="min-h-12 border border-coffee-gold/25 bg-coffee-black px-4 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Email
            <input
              required
              type="email"
              name="email"
              className="min-h-12 border border-coffee-gold/25 bg-coffee-black px-4 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Phone
            <input
              name="phone"
              className="min-h-12 border border-coffee-gold/25 bg-coffee-black px-4 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
              placeholder="(555) 000-0000"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Message
            <textarea
              required
              name="message"
              rows={5}
              className="resize-none border border-coffee-gold/25 bg-coffee-black px-4 py-3 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
              placeholder="Tell us what you are looking for..."
            />
          </label>
          <button
            type="submit"
            className="min-h-12 bg-coffee-gold px-5 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-coffee-cream"
          >
            Send Message
          </button>
          {status ? <p className="text-sm text-coffee-cream/80">{status}</p> : null}
          {/* TODO: Connect this form to email, HubSpot, Airtable, or another CRM. */}
        </form>
      </div>
    </section>
  );
}
