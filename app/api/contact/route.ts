import { NextRequest, NextResponse } from "next/server";
import {
  getClientAddress,
  hasBearerToken,
  hasValidRequestOrigin,
  isRateLimited,
} from "@/lib/requestSecurity";

export const runtime = "nodejs";

const CONTACT_EMAIL =
  process.env.BUSINESS_CONTACT_TO_EMAIL || "laniakea280@gmail.com";
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  message: string;
  website?: string;
};

const FIELD_LIMITS = { name: 100, email: 254, phone: 40, inquiryType: 80, message: 4_000 };

function getString(body: Record<string, unknown>, key: keyof ContactPayload) {
  const value = body[key];

  return typeof value === "string" ? value.trim() : "";
}

function formatFromEmail(value?: string) {
  const email = value?.trim() || DEFAULT_FROM_EMAIL;

  if (email.includes("<") && email.includes(">")) {
    return email;
  }

  return `Laniakea Coffee <${email}>`;
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
  if (!hasValidRequestOrigin(request)) {
    return NextResponse.json({ code: "invalid_origin", error: "Invalid request origin." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 32_000) {
    return NextResponse.json({ code: "payload_too_large", error: "Request is too large." }, { status: 413 });
  }

  const trusted = hasBearerToken(request, process.env.CONTACT_FORM_ACCESS_TOKEN);
  const address = getClientAddress(request);
  if (!trusted && isRateLimited(`contact:${address}`, 5, 15 * 60_000)) {
    return NextResponse.json({ code: "rate_limited", error: "Too many requests." }, { status: 429 });
  }

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { code: "invalid_body", error: "Invalid request body." },
      { status: 400 }
    );
  }

  const payload: ContactPayload = {
    name: getString(body, "name"),
    email: getString(body, "email"),
    phone: getString(body, "phone"),
    inquiryType: getString(body, "inquiryType"),
    message: getString(body, "message"),
    website: getString(body, "website"),
  };

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { code: "missing_fields", error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return NextResponse.json(
      { code: "invalid_email", error: "A valid email is required." },
      { status: 400 }
    );
  }

  if (
    payload.name.length > FIELD_LIMITS.name ||
    payload.email.length > FIELD_LIMITS.email ||
    (payload.phone?.length || 0) > FIELD_LIMITS.phone ||
    (payload.inquiryType?.length || 0) > FIELD_LIMITS.inquiryType ||
    payload.message.length > FIELD_LIMITS.message
  ) {
    return NextResponse.json(
      { code: "fields_too_long", error: "One or more fields are too long." },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = formatFromEmail(process.env.RESEND_FROM_EMAIL);

  if (!resendApiKey) {
    console.error("Contact email is not configured: missing RESEND_API_KEY.");
    return NextResponse.json(
      { code: "missing_resend_api_key", error: "Email service is not configured." },
      { status: 500 }
    );
  }

  if (!EMAIL_REGEX.test(CONTACT_EMAIL)) {
    console.error("Contact email is not configured: invalid BUSINESS_CONTACT_TO_EMAIL.");
    return NextResponse.json(
      { code: "invalid_contact_email", error: "Email destination is not configured." },
      { status: 500 }
    );
  }

  const subjectType = payload.inquiryType || "Consulta general";
  const subject = `Nuevo mensaje de ${payload.name} - ${subjectType}`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
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
      const resendError = await resendResponse.text();
      console.error("Resend contact email failed", {
        status: resendResponse.status,
        error: resendError,
        from: fromEmail,
        to: CONTACT_EMAIL,
      });

      return NextResponse.json(
        { code: "resend_rejected", error: "Contact message could not be sent." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Contact email request failed", error);

    return NextResponse.json(
      { code: "email_request_failed", error: "Contact message could not be sent." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
