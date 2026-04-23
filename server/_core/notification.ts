import nodemailer from "nodemailer";

export type NotificationPayload = { title: string; content: string };

export async function notifyOwner(payload: NotificationPayload): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.NOTIFY_EMAIL ?? user;

  if (!host || !user || !pass || !to) {
    console.log(`[Notification] ${payload.title}: ${payload.content}`);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const htmlContent = payload.content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: `"Osmel Fabre" <${user}>`,
      to,
      subject: `[osmelfabre.it] ${payload.title}`,
      text: payload.content.replace(/\*\*/g, ""),
      html: `<div style="font-family:sans-serif;line-height:1.6;max-width:600px;margin:0 auto;padding:24px">
<h2 style="margin:0 0 16px;font-size:18px">${payload.title}</h2>
<p style="color:#555">${htmlContent}</p>
</div>`,
    });

    return true;
  } catch (err: any) {
    console.error("[Notification] Email error:", err.message);
    return false;
  }
}
