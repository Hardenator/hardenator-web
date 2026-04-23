import type { Metadata } from "next";
import { StubPage } from "../stub";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Hardenator stores, for how long, and who it's shared with.",
};

export default function PrivacyPage() {
  return (
    <StubPage
      eyebrow="Privacy"
      title="What we store. For how long. Who sees it."
      lead="Last updated 2026-04-24. The short version: as little as possible, as briefly as possible, nobody outside Hardenator."
      body={
        <>
          <p style={{ marginBottom: 16 }}>
            <strong>Waitlist signups.</strong> When you join the waitlist we
            store: your email address, the referral token (if any), the time
            you signed up. That&apos;s it. We use it to send you Breach Watch +
            product updates. We don&apos;t share or sell it.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Scanned code.</strong> When the paid tier ships, Hardenator
            will clone your repo into an isolated container to run scans, then
            delete the clone within 5 minutes. We never persist your source
            code to our databases. We persist only findings (file path + line
            number + rule ID + severity), never the surrounding code.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Telemetry.</strong> The CLI sends anonymous, opt-in-only
            events to PostHog: command name, exit code, no payload. Disable
            it with{" "}
            <code
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                background: "var(--ink)",
                color: "var(--paper)",
                padding: "2px 8px",
              }}
            >
              HARDENATOR_TELEMETRY=off
            </code>{" "}
            in your env.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Email service.</strong> Resend (ap-northeast-1) sends our
            transactional mail. They see your email address (to deliver to it)
            but don&apos;t store payload content beyond Resend&apos;s standard
            operational logs.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Analytics.</strong> PostHog on the marketing site — page
            views, click events, no PII. You can opt out via standard
            Do-Not-Track headers.
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Data subject rights (GDPR).</strong> Email{" "}
            <a
              href="mailto:hello@hardenator.com"
              style={{ color: "var(--ink)", textDecoration: "underline" }}
            >
              hello@hardenator.com
            </a>{" "}
            and we&apos;ll action access / export / deletion requests within 30
            days.
          </p>
          <p>
            <strong>Changes.</strong> Material changes get emailed to waitlist
            members 14 days before taking effect.
          </p>
        </>
      }
    />
  );
}
