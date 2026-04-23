import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WaitlistBody = {
  email?: unknown;
  ref?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_EMAIL = "lingeshbalasubramaniam@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "hello@hardenator.com";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

function hashRank(email: string): number {
  // Deterministic pseudo-rank. Not a real position — placeholder until
  // Vercel KV / Neon is wired up in Week 3. Between 100 and 999.
  let h = 0;
  for (let i = 0; i < email.length; i++) {
    h = (h * 31 + email.charCodeAt(i)) | 0;
  }
  return 100 + (Math.abs(h) % 900);
}

async function sendResendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true as const };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${text}`);
  }
  return { skipped: false as const };
}

function welcomeHtml(email: string, rank: number): string {
  return `<!DOCTYPE html><html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; color:#0c0c0c; background:#f4f1ea; max-width:560px; margin:0 auto; padding:32px;">
<p style="font-family: 'JetBrains Mono', monospace; font-size:12px; color:#8f8b7e; letter-spacing:0.15em; text-transform:uppercase;">hardenator</p>
<h1 style="font-weight:900; font-size:28px; letter-spacing:-0.02em; margin:16px 0;">You're on the waitlist.</h1>
<p>Position #${rank}. Thanks for joining.</p>
<p>Quick context on what you just signed up for:</p>
<p>Hardenator catches the security holes your AI coding agent misses — at generation time, not six weeks after you ship. We do it because I audited my own vibe-coded SaaS three weeks ago and found fourteen findings I hadn't thought to look for. Most of them RLS misses. If you've shipped a Supabase app via Lovable / Bolt / Cursor / Claude Code, you probably have similar holes.</p>
<p>What happens next:</p>
<ul>
<li>Weekly Breach Watch email — one real vibe-coded breach, what it was, how to avoid it</li>
<li>Early access to the OSS rule library (MIT, ships this week)</li>
<li>First 100 waitlist signups get lifetime 30% off when paid tier launches</li>
</ul>
<p>If any of this looks off, reply to this email. I read everything.</p>
<p>— Lingesh<br/><span style="color:#8f8b7e;">Founder, Hardenator</span></p>
<hr style="border:none; border-top:1px solid #8f8b7e; margin:32px 0;"/>
<p style="font-family: 'JetBrains Mono', monospace; font-size:11px; color:#8f8b7e;">You're receiving this because you joined the waitlist at hardenator.com. One-click unsubscribe: reply "unsubscribe".</p>
</body></html>`;
}

function adminHtml(email: string, ref: string | null, rank: number): string {
  return `<p>New waitlist signup.</p>
<ul>
<li>Email: <strong>${email}</strong></li>
<li>Ref: ${ref ?? "(none)"}</li>
<li>Assigned rank: #${rank}</li>
<li>Time: ${new Date().toISOString()}</li>
</ul>`;
}

export async function POST(request: Request) {
  let body: WaitlistBody;
  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const rawEmail = isNonEmptyString(body.email) ? body.email.trim().toLowerCase() : "";
  const ref = isNonEmptyString(body.ref) ? body.ref.trim() : null;

  if (!rawEmail || !EMAIL_RE.test(rawEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const rank = hashRank(rawEmail);
  const ts = new Date().toISOString();

  // Persist to server logs. This is the fallback until Week 3 (real DB).
  // Visible in Vercel Functions logs.
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      event: "waitlist_signup",
      email: rawEmail,
      ref,
      rank,
      ts,
    }),
  );

  // Fire emails in parallel; do not block signup if they fail.
  const emailResults = await Promise.allSettled([
    sendResendEmail(
      rawEmail,
      "You're on the Hardenator waitlist",
      welcomeHtml(rawEmail, rank),
    ),
    sendResendEmail(
      ADMIN_EMAIL,
      `Waitlist signup: ${rawEmail}`,
      adminHtml(rawEmail, ref, rank),
    ),
  ]);

  for (const r of emailResults) {
    if (r.status === "rejected") {
      // eslint-disable-next-line no-console
      console.error(
        JSON.stringify({ event: "resend_error", error: String(r.reason) }),
      );
    }
  }

  return NextResponse.json(
    {
      ok: true,
      rank,
      message: `You're in. Position #${rank}.`,
    },
    { status: 200 },
  );
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "waitlist" }, { status: 200 });
}
