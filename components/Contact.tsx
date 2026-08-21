"use client";

import { FormEvent, useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactResponse = {
  ok?: boolean;
  code?: string;
  error?: string;
};

function getErrorMessage(code?: string) {
  if (code === "invalid_contact_email") {
    return "No pudimos recibir tu mensaje en este momento. Escríbenos a laniakea280@gmail.com o por WhatsApp al +1 (650) 200-8821.";
  }

  return "No pudimos enviar tu mensaje en este momento. Escríbenos a laniakea280@gmail.com o por WhatsApp al +1 (650) 200-8821.";
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();

    setStatus("idle");
    setStatusMessage("");

    if (!emailPattern.test(email)) {
      setStatus("error");
      setStatusMessage("Por favor escribe un correo electrónico válido.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(formData.get("name") || "").trim(),
          email,
          phone: String(formData.get("phone") || "").trim(),
          inquiryType: String(formData.get("inquiryType") || "").trim(),
          message: String(formData.get("message") || "").trim(),
          website: String(formData.get("website") || "").trim(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as ContactResponse;

      if (!response.ok) {
        throw new Error(data.code || "contact_request_failed");
      }

      setStatus("success");
      setStatusMessage(
        "Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos muy pronto."
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        getErrorMessage(error instanceof Error ? error.message : undefined)
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-coffee-black px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coffee-gold">
            Contacto
          </p>
          <h2 className="font-serif text-4xl leading-tight text-coffee-parchment md:text-6xl">
            Lleva Laniakea a tu hogar, oficina, café o boutique.
          </h2>
          <p className="mt-6 text-lg leading-8 text-coffee-cream/76">
            Escríbenos para pedidos, degustaciones, venta al por mayor o alianzas.
            Te responderemos con una atención cercana, clara y profesional.
          </p>

          <div
            id="wholesale"
            className="mt-10 border border-coffee-gold/35 bg-coffee-espresso p-6"
          >
            <h3 className="font-serif text-2xl text-coffee-parchment">
              Venta al por mayor
            </h3>
            <p className="mt-3 leading-7 text-coffee-cream/76">
              Para restaurantes, cafés, oficinas, hoteles y tiendas especializadas,
              pregunta por suministro recurrente, formatos comerciales y opciones de
              degustación privada.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 border border-coffee-gold/35 bg-coffee-espresso p-6 shadow-luxury"
        >
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[10000px] h-px w-px overflow-hidden"
          />
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Nombre
            <input
              required
              name="name"
              autoComplete="name"
              className="min-h-12 border border-coffee-gold/25 bg-coffee-black px-4 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
              placeholder="Tu nombre"
              maxLength={100}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Correo electrónico
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="min-h-12 border border-coffee-gold/25 bg-coffee-black px-4 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
              placeholder="tu@email.com"
              maxLength={254}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Teléfono
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              className="min-h-12 border border-coffee-gold/25 bg-coffee-black px-4 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
              placeholder="(555) 000-0000"
              maxLength={40}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Tipo de consulta
            <select
              name="inquiryType"
              defaultValue=""
              className="min-h-12 border border-coffee-gold/25 bg-coffee-black px-4 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
            >
              <option value="">Selecciona una opción</option>
              <option value="Pedido personal">Pedido personal</option>
              <option value="Venta al por mayor">Venta al por mayor</option>
              <option value="Degustación">Degustación</option>
              <option value="Alianza comercial">Alianza comercial</option>
              <option value="Consulta general">Consulta general</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-coffee-gold">
            Mensaje
            <textarea
              required
              name="message"
              rows={5}
              className="resize-none border border-coffee-gold/25 bg-coffee-black px-4 py-3 text-base normal-case tracking-normal text-coffee-cream outline-none transition focus:border-coffee-gold"
              placeholder="Cuéntanos qué estás buscando..."
              maxLength={4000}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-12 bg-coffee-gold px-5 text-sm font-bold uppercase tracking-[0.18em] text-coffee-black transition hover:bg-coffee-cream disabled:cursor-not-allowed disabled:bg-coffee-gold/50"
          >
            {isSubmitting ? "Enviando…" : "Enviar mensaje"}
          </button>
          {statusMessage ? (
            <p
              className={`border px-4 py-3 text-sm leading-6 ${
                status === "success"
                  ? "border-coffee-gold/35 bg-coffee-gold/10 text-coffee-cream"
                  : "border-red-400/35 bg-red-950/25 text-red-100"
              }`}
            >
              {statusMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
