import type { ContactMessage } from "./contact";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function contactEmailSubject(m: ContactMessage): string {
  if (m.subject && !m.subject.startsWith("VehicleHandoff: ")) return `[VehicleHandoff] ${m.subject} · ${m.name}`;
  return `[VehicleHandoff] ${m.topic}${m.saleNumber ? ` · ${m.saleNumber}` : ""} · ${m.name}`;
}

export function contactEmailText(m: ContactMessage): string {
  return [
    "New message from the VehicleHandoff contact form",
    "",
    `Name: ${m.name}`,
    `Email: ${m.email}`,
    `Topic: ${m.topic}`,
    `Sale number: ${m.saleNumber || "-"}`,
    `Received: ${m.createdAt}`,
    "",
    m.message,
    "",
    "Reply to this email to answer the customer directly.",
  ].join("\n");
}

export function contactEmailHtml(m: ContactMessage, site = "https://vehiclehandoff.ca"): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 0;color:#4d6178;font-size:13px;width:110px;vertical-align:top">${k}</td><td style="padding:6px 0;color:#1b1446;font-size:15px;font-weight:600">${v}</td></tr>`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(contactEmailSubject(m))}</title></head>
<body style="margin:0;padding:0;background:#fff8f0;font-family:Inter,'Segoe UI',Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f0;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #d8e7ee">
<tr><td style="background:#1b1446;background-image:linear-gradient(135deg,#1b1446 0%,#2a1f6e 55%,#ff7a3d 100%);padding:26px 28px">
<div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-.02em">VehicleHandoff<span style="color:#ffb27a">.ca</span></div>
<div style="color:#ffffff;font-size:22px;font-weight:800;margin-top:18px">New contact message</div>
<div style="color:#ffe0cc;font-size:14px;margin-top:4px">${esc(m.topic)}</div>
</td></tr>
<tr><td style="padding:24px 28px 8px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Name", esc(m.name))}
${row("Email", `<a href="mailto:${esc(m.email)}" style="color:#e8622c;text-decoration:none">${esc(m.email)}</a>`)}
${row("Topic", esc(m.topic))}
${row("Sale number", esc(m.saleNumber || "-"))}
</table></td></tr>
<tr><td style="padding:8px 28px 4px"><div style="background:#fff8f0;border-left:4px solid #ff6b4a;border-radius:10px;padding:16px 18px;color:#1b1446;font-size:15px;line-height:1.55;white-space:pre-wrap">${esc(m.message)}</div></td></tr>
<tr><td style="padding:20px 28px 26px"><a href="mailto:${esc(m.email)}?subject=${encodeURIComponent("Re: " + m.topic)}" style="display:inline-block;background:#ff6b4a;background-image:linear-gradient(135deg,#ff6b4a,#ff8f5a);color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:12px">Reply to ${esc(m.name.split(" ")[0] || "customer")}</a>
<div style="color:#4d6178;font-size:12px;margin-top:14px">Or just hit Reply: it goes straight to the customer. Ref ${esc(m.id)}</div></td></tr>
<tr><td style="background:#1b1446;color:#9fb6cc;font-size:12px;padding:14px 28px">Sent by the contact form on <a href="${site}/contact" style="color:#ffb27a;text-decoration:none">vehiclehandoff.ca</a></td></tr>
</table></td></tr></table></body></html>`;
}
