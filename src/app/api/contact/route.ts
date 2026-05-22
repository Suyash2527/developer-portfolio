import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Configure Nodemailer transporter
    // For Gmail, use host: "smtp.gmail.com", port: 465, secure: true
    // Or configure your custom SMTP server in environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE !== "false", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // e.g., your gmail address
        pass: process.env.SMTP_PASS, // e.g., app password
      },
    });

    // 1. Send the automated thank you email to the user
    await transporter.sendMail({
      from: `"Suyash" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for reaching out!",
      text: `Hi ${name},\n\nThank you for reaching out through my portfolio!\n\nI've received your message regarding "${subject}" and will get back to you within 24 hours.\n\nBest regards,\nSuyash`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Portfolio Contact Reply</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Space+Mono:wght@400;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background-color: #f5f0e8;
    font-family: 'IBM Plex Mono', 'Courier New', monospace;
    padding: 40px 20px;
  }

  .email-wrapper {
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    border: 3px solid #000000;
  }

  /* ── HEADER ── */
  .email-header {
    background: #000000;
    padding: 28px 28px 24px;
    border-bottom: 3px solid #000;
  }

  .email-header .pre-label {
    font-size: 9px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #666666;
    margin-bottom: 8px;
  }

  .email-header h1 {
    font-family: 'Space Mono', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #f5f0e8;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  /* ── META ROWS ── */
  .meta-table {
    width: 100%;
    border-collapse: collapse;
    border-bottom: 3px solid #000;
  }

  .meta-table tr {
    border-bottom: 1px solid #000;
  }

  .meta-table tr:last-child {
    border-bottom: none;
  }

  .meta-table td {
    padding: 9px 14px;
    font-size: 11px;
  }

  .meta-key {
    background: #000;
    color: #f5f0e8;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    width: 70px;
    font-size: 9px !important;
    vertical-align: middle;
  }

  .meta-val {
    color: #111;
    font-size: 12px;
  }

  /* ── BODY ── */
  .email-body {
    padding: 28px;
    border-bottom: 3px solid #000;
  }

  .stamp {
    display: inline-block;
    border: 2px solid #000;
    padding: 4px 10px;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #000;
    margin-bottom: 20px;
  }

  .greeting {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-left: 4px solid #000;
    padding-left: 12px;
    margin-bottom: 18px;
    color: #000;
  }

  .body-text {
    font-size: 13px;
    line-height: 1.85;
    color: #111;
    margin-bottom: 14px;
  }

  .body-text strong {
    font-weight: 700;
  }

  .message-echo {
    background: #f0e040;
    border: 2px solid #000;
    padding: 14px 16px;
    margin: 20px 0;
    font-size: 12px;
    line-height: 1.7;
  }

  .message-echo .echo-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #555;
    margin-bottom: 6px;
    display: block;
  }

  .message-echo .echo-text {
    color: #111;
    font-style: italic;
    white-space: pre-wrap;
  }

  hr.brut-rule {
    border: none;
    border-top: 2px solid #000;
    margin: 20px 0;
  }

  .cta-btn {
    display: inline-block;
    background: #000;
    color: #f5f0e8;
    padding: 13px 20px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: none;
    border: 2px solid #000;
    margin: 6px 0 20px;
  }

  .sign-off {
    font-size: 12px;
    color: #555;
    margin-top: 4px;
  }

  .sign-off .name {
    font-family: 'Space Mono', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #000;
    display: block;
    letter-spacing: -0.03em;
    margin-top: 4px;
  }

  /* ── FOOTER ── */
  .email-footer {
    background: #111;
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .footer-left {
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .footer-dot {
    width: 6px;
    height: 6px;
    background: #f0e040;
    display: inline-block;
    flex-shrink: 0;
  }

  .footer-right {
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #666;
  }
</style>
</head>
<body>

<div class="email-wrapper">

  <!-- HEADER -->
  <div class="email-header">
    <p class="pre-label">incoming transmission acknowledged</p>
    <h1>Re: Your message —<br>got it.</h1>
  </div>

  <!-- META -->
  <table class="meta-table">
    <tr>
      <td class="meta-key">From</td>
      <td class="meta-val">csuyash2506@gmail.com</td>
    </tr>
    <tr>
      <td class="meta-key">To</td>
      <td class="meta-val">${email}</td>
    </tr>
    <tr>
      <td class="meta-key">Date</td>
      <td class="meta-val">${new Date().toLocaleDateString()}</td>
    </tr>
    <tr>
      <td class="meta-key">Re</td>
      <td class="meta-val">Contact Form Submission</td>
    </tr>
  </table>

  <!-- BODY -->
  <div class="email-body">

    <span class="stamp">auto-reply / 001</span>

    <p class="greeting">Hey ${name.split(' ')[0]} —</p>

    <p class="body-text">
      Your message landed. I read every single one of these — no bots, no filters, no AI sorting tray. Just me.
    </p>

    <p class="body-text">
      I'll get back to you within <strong>24–48 hours.</strong> If it's genuinely urgent, reply directly to this email.
    </p>

    <div class="message-echo">
      <span class="echo-label">what you wrote</span>
      <span class="echo-text">"${message}"</span>
    </div>

    <hr class="brut-rule" />

    <p class="body-text">While you wait, take a look at what I've been building:</p>

    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://suyash-chaudhari.web.app'}" class="cta-btn">→ view portfolio</a>

    <p class="sign-off">
      Talk soon,
      <span class="name">Suyash.</span>
    </p>

  </div>

  <!-- FOOTER -->
  <div class="email-footer">
    <span class="footer-left">
      <span class="footer-dot"></span>
      automated reply · do not reply to this thread
    </span>
    <span class="footer-right">Suyash Portfolio</span>
  </div>

</div>

</body>
</html>
      `,
    });

    // Optionally: 2. Send an email to yourself as a notification (if you want an email alert)
    if (process.env.SMTP_USER) {
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: `New Portfolio Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
