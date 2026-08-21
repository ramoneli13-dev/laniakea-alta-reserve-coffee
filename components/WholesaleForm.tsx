"use client";

import { FormEvent, useState } from "react";

export function WholesaleForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setStatus("");

    const details = [
      `Empresa: ${data.get("business")}`,
      `Cargo: ${data.get("role")}`,
      `Ciudad/Estado: ${data.get("location")}`,
      `Volumen estimado: ${data.get("volume") || "Por definir"}`,
      `Tipo de negocio: ${data.get("businessType")}`,
      "",
      `Mensaje: ${data.get("message")}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          inquiryType: "Solicitud mayorista",
          message: details,
          website: String(data.get("website") || ""),
        }),
      });
      if (!response.ok) throw new Error();
      form.reset();
      setStatus("Solicitud recibida. Revisaremos la información y nos comunicaremos contigo.");
    } catch {
      setStatus("No pudimos enviar la solicitud. Escríbenos por WhatsApp para ayudarte.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="wholesale-application" className="bg-coffee-parchment px-5 py-24 text-coffee-black md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-coffee-brown">Alianzas comerciales</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Solicita información mayorista.</h2>
          <p className="mt-6 text-lg leading-8 text-coffee-black/70">Cuéntanos sobre tu negocio. La solicitud no crea una obligación de compra ni garantiza disponibilidad, precio o aprobación comercial.</p>
          <div className="mt-8 border-l-2 border-coffee-brown/40 pl-5 text-sm leading-7 text-coffee-black/65">Los precios, cantidades mínimas, entrega y condiciones se confirman por escrito antes de aceptar cualquier pedido.</div>
        </div>
        <form onSubmit={submit} className="grid gap-5 border border-coffee-brown/20 bg-white/45 p-6 md:grid-cols-2 md:p-8">
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[10000px] h-px w-px" />
          {[
            ["Nombre completo", "name", "name"], ["Empresa", "business", "organization"],
            ["Correo", "email", "email"], ["Teléfono", "phone", "tel"],
            ["Cargo", "role", "organization-title"], ["Ciudad y estado", "location", "address-level2"],
          ].map(([label, name, autoComplete]) => (
            <label key={name} className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-coffee-brown">{label}<input required name={name} autoComplete={autoComplete} className="min-h-12 border border-coffee-brown/25 bg-coffee-parchment px-4 text-base font-normal normal-case tracking-normal outline-none focus:border-coffee-brown" maxLength={name === "email" ? 254 : 100} /></label>
          ))}
          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-coffee-brown">Tipo de negocio<select required name="businessType" defaultValue="" className="min-h-12 border border-coffee-brown/25 bg-coffee-parchment px-4 text-base font-normal normal-case tracking-normal"><option value="" disabled>Selecciona</option><option>Cafetería</option><option>Restaurante u hotel</option><option>Oficina</option><option>Tienda o distribuidor</option><option>Otro</option></select></label>
          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-coffee-brown">Volumen estimado mensual<input name="volume" placeholder="Ej. 20 lb" className="min-h-12 border border-coffee-brown/25 bg-coffee-parchment px-4 text-base font-normal normal-case tracking-normal outline-none focus:border-coffee-brown" maxLength={80} /></label>
          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-coffee-brown md:col-span-2">¿Qué necesitas?<textarea required name="message" rows={4} maxLength={3000} className="border border-coffee-brown/25 bg-coffee-parchment px-4 py-3 text-base font-normal normal-case tracking-normal outline-none focus:border-coffee-brown" /></label>
          <label className="flex items-start gap-3 text-sm leading-6 text-coffee-black/70 md:col-span-2"><input required type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-coffee-brown" /><span>Acepto que Laniakea use mis datos para responder esta solicitud conforme a la <a className="font-semibold underline" href="/legal#privacy" target="_blank">Política de Privacidad</a>. Entiendo que esto no me suscribe a publicidad.</span></label>
          <button disabled={sending} className="min-h-12 bg-coffee-black px-6 text-sm font-bold uppercase tracking-[0.18em] text-coffee-gold transition hover:bg-coffee-brown disabled:opacity-60 md:col-span-2">{sending ? "Enviando…" : "Enviar solicitud"}</button>
          {status ? <p role="status" className="text-sm leading-6 text-coffee-black/70 md:col-span-2">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}
