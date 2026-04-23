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
const RESILLATOR_API_BASE =
  process.env.RESILLATOR_API_BASE ?? "https://resillator.xyz/api/v1";

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

async function syncToResillator(
  email: string,
  rank: number,
  ref: string | null,
): Promise<{ skipped: boolean }> {
  const apiKey = process.env.RESILLATOR_API_KEY;
  if (!apiKey) return { skipped: true };

  const displayName = email.split("@")[0] ?? email;
  const res = await fetch(`${RESILLATOR_API_BASE}/entities`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      entityTypeKey: "subscriber",
      name: displayName,
      status: "trial",
      customData: {
        email,
        plan: "Free",
        mrr: 0,
        acquisition_source: ref ? "Referral" : "Organic Search",
        churn_risk: "Low",
        health_score: 100,
        rank,
        ref: ref ?? "(none)",
        signed_up_at: new Date().toISOString(),
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resillator ${res.status}: ${text}`);
  }
  return { skipped: false };
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

function welcomeHtml(_email: string, rank: number): string {
  return `<!DOCTYPE html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0c0c0c;background:#f4f1ea;max-width:580px;margin:0 auto;padding:36px 28px;line-height:1.55;">
<p style="font-family:ui-monospace,'JetBrains Mono',monospace;font-size:11px;color:#8f8b7e;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 12px 0;">hardenator</p>
<h1 style="font-weight:900;font-size:30px;letter-spacing:-0.02em;margin:0 0 8px 0;line-height:1.1;">You're in.</h1>
<p style="margin:0 0 24px 0;color:#1a1a1a;">Position #${rank}.</p>

<p>Three weeks ago I audited my own vibe-coded SaaS. Found a dozen-plus security holes — a password-reset table readable by anyone with the anon key, a service-role key a build step was quietly shipping to the frontend, an admin route that only checked "is user logged in" instead of "is user an admin," a Stripe webhook with no signature verification. None broke a test. All of them mattered.</p>

<p>The patterns don't care which stack you're on. Supabase, Firebase, raw Postgres. Next, Remix, FastAPI, Django. Lovable, Bolt, Cursor, v0, Replit, Claude Code, Codex, Devin — the gaps repeat. Hardenator's job is to catch them at generation time, before the PR, not six weeks after launch when a stranger DMs you a proof of concept.</p>

<p style="font-weight:700;margin:28px 0 8px 0;">What actually lands in your inbox from here:</p>
<ul style="padding-left:20px;margin:0 0 24px 0;">
<li style="margin-bottom:10px;"><strong>Breach Watch</strong>, weekly — one real vibe-coded breach, what went wrong, which rule would have caught it. First drops next week.</li>
<li style="margin-bottom:10px;"><strong>The OSS rule library</strong> — 100+ rules covering auth, secrets, access control, headers, payments, SQL, agent governance. MIT, on GitHub, ships this week. Works with Semgrep standalone — no Hardenator install required.</li>
<li style="margin-bottom:10px;"><strong>Paid tier launch</strong> — 24-hour heads-up before public. First 100 waitlist signups lock in 30% off for life.</li>
</ul>

<p>Come hang out while I build — the Discord's called The Dojo: <a href="https://discord.gg/RVU7BjJANC" style="color:#0c0c0c;font-weight:700;">discord.gg/RVU7BjJANC</a> (empty today; that's the fun part).</p>

<p>If any of this is off, reply. Every reply lands in my inbox.</p>

<p style="margin-top:28px;">— Lingesh</p>

<hr style="border:none;border-top:1px solid #d7d3ca;margin:36px 0 16px 0;"/>
<p style="font-family:ui-monospace,'JetBrains Mono',monospace;font-size:11px;color:#8f8b7e;margin:0;line-height:1.6;">You joined the waitlist at <a href="https://hardenator.com" style="color:#8f8b7e;">hardenator.com</a>. To leave the list, reply with <strong>unsubscribe</strong> — I read every one.</p>
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

  // Fire all side effects in parallel; none block the signup response.
  const sideEffects = await Promise.allSettled([
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
    syncToResillator(rawEmail, rank, ref),
  ]);

  const labels = ["welcome_email", "admin_email", "resillator_sync"];
  sideEffects.forEach((r, i) => {
    if (r.status === "rejected") {
      // eslint-disable-next-line no-console
      console.error(
        JSON.stringify({
          event: `${labels[i]}_error`,
          error: String(r.reason),
        }),
      );
    }
  });

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
