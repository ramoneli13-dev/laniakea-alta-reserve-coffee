import { NextRequest, NextResponse } from "next/server";

const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL || "ramoneli13@gmail.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  message: string;
};

function getString(body: Record<string, unknown>, key: keyof ContactPayload) {
  const value = body[key];

  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailHtml(payload: ContactPayload) {
  const phone = payload.phone || "No incluido";
  const inquiryType = payload.inquiryType || "Consulta general";

  return `
    <div style="background:#0b0806;color:#f7ead3;font-family:Arial,sans-serif;padding:28px;">
      <div style="max-width:640px;margin:0 auto;border:1px solid rgba(203,161,82,.45);padding:28px;background:#15100c;">
        <p style="margin:0 0 10px;color:#cba152;text-transform:uppercase;letter-spacing:2px;font-size:12px;">Laniakea Alta Reserve Coffee</p>
        <h1 style="margin:0 0 22px;font-family:Georgia,serif;font-size:28px;color:#f7ead3;">Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Tipo de consulta:</strong> ${escapeHtml(inquiryType)}</p>
        <div style="margin-top:22px;padding-top:18px;border-top:1px solid rgba(203,161,82,.3);">
          <p style="margin:0 0 8px;color:#cba152;"><strong>Mensaje</strong></p>
          <p style="white-space:pre-line;line-height:1.7;">${escapeHtml(payload.message)}</p>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(payload: ContactPayload) {
  return [
    "Nuevo mensaje de contacto - Laniakea Alta Reserve Coffee",
    `Nombre: ${payload.name}`,
    `Correo: ${payload.email}`,
    `Telefono: ${payload.phone || "No incluido"}`,
    `Tipo de consulta: ${payload.inquiryType || "Consulta general"}`,
    "",
    "Mensaje:",
    payload.message,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: getString(body, "name"),
    email: getString(body, "email"),
    phone: getString(body, "phone"),
    inquiryType: getString(body, "inquiryType"),
    message: getString(body, "message"),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "Laniakea Coffee <onboarding@resend.dev>";
  const subject = `Nuevo mensaje de ${payload.name} - Laniakea Coffee`;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: CONTACT_EMAIL,
      reply_to: payload.email,
      subject,
      text: buildEmailText(payload),
      html: buildEmailHtml(payload),
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: "Contact message could not be sent." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
